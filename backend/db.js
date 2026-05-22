const { Pool } = require('pg');
require('dotenv').config();

// Supabase requires SSL connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Handle pool errors gracefully so they don't crash the process
pool.on('error', (err) => {
  console.error('[DB] Unexpected pool error:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getPool: () => pool
};
