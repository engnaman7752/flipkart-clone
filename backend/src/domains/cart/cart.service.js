const db = require('../../../db');

const getCartItems = async (userId) => {
  const query = `
    SELECT c.id, c.quantity, c.product_id, p.name, p.price, p.mrp, p.images[1] as image
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = $1
    ORDER BY c.added_at DESC
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
};

const addItemToCart = async (userId, productId, quantity) => {
  const query = `
    INSERT INTO cart_items (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
  `;
  await db.query(query, [userId, productId, quantity]);
};

const updateItemQuantity = async (userId, productId, quantity) => {
  const query = `
    UPDATE cart_items
    SET quantity = $1
    WHERE user_id = $2 AND product_id = $3
  `;
  await db.query(query, [quantity, userId, productId]);
};

const removeItemFromCart = async (userId, productId) => {
  const query = `
    DELETE FROM cart_items
    WHERE user_id = $1 AND product_id = $2
  `;
  await db.query(query, [userId, productId]);
};

// HLD: This will be called by the background worker, NOT the order service directly.
const clearCart = async (userId) => {
  const query = `DELETE FROM cart_items WHERE user_id = $1`;
  await db.query(query, [userId]);
};

module.exports = {
  getCartItems,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart
};
