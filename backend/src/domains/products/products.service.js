const db = require('../../../db');

const SYNONYMS = {
  'smartphone': 'Mobiles',
  'smartphones': 'Mobiles',
  'phone': 'Mobiles',
  'phones': 'Mobiles',
  'mobile': 'Mobiles',
  'mobiles': 'Mobiles'
};

const findAllProducts = async ({ search, category }) => {
  let query = 'SELECT *, 0.0 AS similarity_score FROM products WHERE 1=1';
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
        query = `SELECT *, 0.0 AS similarity_score FROM products WHERE 1=1`;
        if (category) {
          query += ` AND category = $1`;
        }
        query += ` AND name ~* $${values.length}`;
        query += ' ORDER BY id ASC';
      } else {
        // For terms longer than 3 characters, perform highly optimized fuzzy search using pg_trgm.
        const paramIndexTerm = values.length + 1; // index for cleanSearch
        const paramIndexLike = values.length + 2; // index for %cleanSearch%
        values.push(cleanSearch);
        values.push(`%${cleanSearch}%`);

        query = `
          SELECT *, word_similarity($${paramIndexTerm}, name) AS similarity_score
          FROM products
          WHERE 1=1
        `;
        if (category) {
          query += ` AND category = $1`;
        }

        const normalizedSearch = cleanSearch.toLowerCase();
        const mappedCategory = SYNONYMS[normalizedSearch];

        if (mappedCategory) {
          const paramIndexMapped = values.length + 1;
          values.push(mappedCategory);
          query += `
            AND (
              name ILIKE $${paramIndexLike}
              OR word_similarity($${paramIndexTerm}, name) > 0.4
              OR category = $${paramIndexMapped}
            )
          `;
        } else {
          query += `
            AND (
              name ILIKE $${paramIndexLike}
              OR word_similarity($${paramIndexTerm}, name) > 0.4
            )
          `;
        }
        // Order by exact matches first, followed by highest similarity score
        query += ` ORDER BY (name ILIKE $${paramIndexLike}) DESC, similarity_score DESC`;
      }
    } else {
      query += ' ORDER BY id ASC';
    }
  } else {
    query += ' ORDER BY id ASC';
  }

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
