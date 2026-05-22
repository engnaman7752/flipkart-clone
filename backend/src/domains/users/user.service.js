const db = require('../../../db');

const getUserProfile = async (userId) => {
  const result = await db.query(
    'SELECT id, name, email, phone, gender, created_at FROM users WHERE id = $1',
    [userId]
  );
  return result.rows[0];
};

const updateUserProfile = async (userId, data) => {
  const { name, phone, gender } = data;
  const result = await db.query(
    'UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), gender = COALESCE($3, gender) WHERE id = $4 RETURNING id, name, email, phone, gender',
    [name, phone, gender, userId]
  );
  return result.rows[0];
};

const getAddresses = async (userId) => {
  const result = await db.query(
    'SELECT * FROM addresses WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

const addAddress = async (userId, data) => {
  const { name, phone, pincode, locality, address, city, state, type } = data;
  
  // If this is the first address, make it default
  const existing = await getAddresses(userId);
  const is_default = existing.length === 0;

  const result = await db.query(
    `INSERT INTO addresses (user_id, name, phone, pincode, locality, address, city, state, type, is_default)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [userId, name, phone, pincode, locality, address, city, state, type || 'HOME', is_default]
  );
  return result.rows[0];
};

const updateAddress = async (userId, addressId, data) => {
  const { name, phone, pincode, locality, address, city, state, type, is_default } = data;

  if (is_default) {
    // Unset other defaults for this user
    await db.query('UPDATE addresses SET is_default = false WHERE user_id = $1', [userId]);
  }

  const result = await db.query(
    `UPDATE addresses SET 
      name = COALESCE($1, name), 
      phone = COALESCE($2, phone), 
      pincode = COALESCE($3, pincode), 
      locality = COALESCE($4, locality), 
      address = COALESCE($5, address), 
      city = COALESCE($6, city), 
      state = COALESCE($7, state), 
      type = COALESCE($8, type),
      is_default = COALESCE($9, is_default)
     WHERE id = $10 AND user_id = $11 RETURNING *`,
    [name, phone, pincode, locality, address, city, state, type, is_default, addressId, userId]
  );
  return result.rows[0];
};

const deleteAddress = async (userId, addressId) => {
  const result = await db.query(
    'DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING *',
    [addressId, userId]
  );
  return result.rows[0];
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
};
