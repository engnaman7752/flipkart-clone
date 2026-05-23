const db = require('../../../db');

const WORD_SYNONYMS = {
  'smartphone': 'mobile',
  'smartphones': 'mobile',
  'phone': 'mobile',
  'phones': 'mobile',
  'eddy': 'adidas',
  'addidas': 'adidas',
  'adida': 'adidas',
  'snekker': 'sneakers',
  'snekkar': 'sneakers',
  'sneker': 'sneakers',
  'snekar': 'sneakers',
  'snicker': 'sneakers',
  'snickers': 'sneakers',
  'shoe': 'sneakers',
  'shoes': 'sneakers',
  'footwear': 'sneakers',
  't-shirts': 't-shirt',
  'tshirts': 't-shirt',
  'tshirt': 't-shirt',
  'shirts': 'shirt',
  'sarees': 'saree',
  'kurtis': 'kurti',
  'lehengas': 'saree', // fallback
  'trousers': 'jeans', // fallback
  'shorts': 'jeans', // fallback
  'track pants': 'jeans', // fallback
  'jackets': 'shirt', // fallback
  'sweatshirts': 'shirt' // fallback
};

const CATEGORY_MAP = {
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
        // For terms longer than 3 characters, perform highly optimized fuzzy search using pg_trgm with query expansion.
        const words = cleanSearch.toLowerCase().split(/\s+/);
        const mappedWords = words.map(w => WORD_SYNONYMS[w] || w);
        const processedSearch = mappedWords.join(' ');

        const paramIndexTerm = values.length + 1; // index for processedSearch
        const paramIndexLike = values.length + 2; // index for %processedSearch%
        values.push(processedSearch);
        values.push(`%${processedSearch}%`);

        query = `
          SELECT *, word_similarity($${paramIndexTerm}, name) AS similarity_score
          FROM products
          WHERE 1=1
        `;
        if (category) {
          query += ` AND category = $1`;
        }

        let mappedCategory = null;
        for (const word of mappedWords) {
          if (CATEGORY_MAP[word]) {
            mappedCategory = CATEGORY_MAP[word];
            break;
          }
        }

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
