const db = require('../../../db');

const getWishlistItems = async (userId) => {
  const result = await db.query(
    `SELECT w.product_id, p.name, p.price, p.mrp, p.rating, p.rating_count, p.images[1] as image, p.brand, p.stock
     FROM wishlist w JOIN products p ON w.product_id = p.id
     WHERE w.user_id = $1 ORDER BY w.added_at DESC`,
    [userId]
  );
  return result.rows;
};

const addItem = async (userId, productId) => {
  await db.query(
    `INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [userId, productId]
  );
};

const removeItem = async (userId, productId) => {
  await db.query(
    `DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2`,
    [userId, productId]
  );
};

module.exports = { getWishlistItems, addItem, removeItem };
