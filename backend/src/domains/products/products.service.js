const db = require('../../../db');

const findAllProducts = async ({ search, category }) => {
  let query = 'SELECT * FROM products WHERE 1=1';
  let values = [];

  if (category) {
    values.push(category);
    query += ` AND category = $${values.length}`;
  }

  if (search) {
    const cleanSearch = search.trim();
    if (cleanSearch.length > 0) {
      if (cleanSearch.length <= 3) {
        // For short terms (like 'ac', 'tv', 'fan'), match as a whole word using regex boundary anchors.
        // We escape special regex characters to prevent syntax errors.
        const escaped = cleanSearch.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        values.push(`\\y${escaped}\\y`);
        query += ` AND name ~* $${values.length}`;
      } else {
        values.push(`%${cleanSearch}%`);
        query += ` AND name ILIKE $${values.length}`;
      }
    }
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
