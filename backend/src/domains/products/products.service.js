const db = require('../../../db');

const findAllProducts = async ({ search, category }) => {
  let query = 'SELECT * FROM products WHERE 1=1';
  let values = [];

  if (category) {
    values.push(category);
    query += ` AND category = $${values.length}`;
  }

  if (search) {
    values.push(`%${search}%`);
    query += ` AND name ILIKE $${values.length}`;
  }

  query += ' ORDER BY id ASC';

  const result = await db.query(query, values);
  return result.rows;
};

const findProductById = async (id) => {
  const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = {
  findAllProducts,
  findProductById
};
