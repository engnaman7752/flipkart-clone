const db = require('../../../db');

const getOrders = async (userId) => {
  const query = `
    SELECT * FROM orders
    WHERE user_id = $1
    ORDER BY placed_at DESC
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
};

const createOrder = async (userId, orderItems, shippingAddress, subtotal, total) => {
  const client = await db.getPool().connect();
  
  try {
    // LLD: Transactional Outbox Pattern
    // We start a transaction to ensure both the order and the background job are saved atomically.
    await client.query('BEGIN');

    // 1. Insert the order
    const insertOrderQuery = `
      INSERT INTO orders (user_id, order_items, shipping_address, subtotal, total)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const orderResult = await client.query(insertOrderQuery, [
      userId,
      JSON.stringify(orderItems), // LLD: JSONB snapshot of cart items
      JSON.stringify(shippingAddress),
      subtotal,
      total
    ]);
    
    const orderId = orderResult.rows[0].id;

    // 2. Insert the background job event (The Outbox)
    // We do NOT clear the cart here synchronously.
    const insertJobQuery = `
      INSERT INTO background_jobs (event_type, payload)
      VALUES ($1, $2)
    `;
    const eventPayload = JSON.stringify({ userId, orderId });
    await client.query(insertJobQuery, ['CLEAR_CART', eventPayload]);

    // Commit the transaction
    await client.query('COMMIT');
    
    return orderId;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  getOrders,
  createOrder
};
