const db = require('./db');
const cartService = require('./src/domains/cart/cart.service');
const cron = require('node-cron');

// LLD: Background Worker acting as the Observer in the Observer Pattern.
// It polls the subject (background_jobs table) for new events.

const processJobs = async () => {
  const client = await db.getPool().connect();

  try {
    // Lock the rows to prevent multiple worker instances from processing the same job concurrently
    const getJobsQuery = `
      SELECT * FROM background_jobs 
      WHERE status = 'PENDING' AND attempts < max_attempts
      ORDER BY created_at ASC
      FOR UPDATE SKIP LOCKED
      LIMIT 10
    `;
    
    await client.query('BEGIN');
    const result = await client.query(getJobsQuery);
    const jobs = result.rows;

    if (jobs.length > 0) {
      console.log(`[Worker] Found ${jobs.length} pending jobs.`);
    }

    for (const job of jobs) {
      try {
        // Mark as processing
        await client.query("UPDATE background_jobs SET status = 'PROCESSING' WHERE id = $1", [job.id]);
        
        // Execute the job logic based on event_type
        if (job.event_type === 'CLEAR_CART') {
          const { userId } = job.payload;
          console.log(`[Worker] Processing CLEAR_CART for user ${userId}`);
          
          // Clear the cart
          await cartService.clearCart(userId);
          
          // Mark as done
          await client.query(
            "UPDATE background_jobs SET status = 'DONE', processed_at = now() WHERE id = $1", 
            [job.id]
          );
          console.log(`[Worker] Job ${job.id} completed successfully.`);
        } else {
           // Unknown job type
           await client.query(
            "UPDATE background_jobs SET status = 'FAILED', processed_at = now() WHERE id = $1", 
            [job.id]
          );
        }
      } catch (err) {
        console.error(`[Worker] Error processing job ${job.id}:`, err);
        // Increment attempts, set to FAILED if max_attempts reached
        const newAttempts = job.attempts + 1;
        const newStatus = newAttempts >= job.max_attempts ? 'FAILED' : 'PENDING';
        
        await client.query(
          "UPDATE background_jobs SET status = $1, attempts = $2 WHERE id = $3", 
          [newStatus, newAttempts, job.id]
        );
      }
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[Worker] Fatal error in job processing loop:', error);
  } finally {
    client.release();
  }
};

// Run the worker every 5 seconds
const startWorker = () => {
  console.log('[Worker] Starting background worker...');
  cron.schedule('*/5 * * * * *', processJobs);
};

module.exports = {
  startWorker
};
