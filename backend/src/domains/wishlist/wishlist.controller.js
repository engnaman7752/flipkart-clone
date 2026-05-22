const wishlistService = require('./wishlist.service');

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await wishlistService.getWishlistItems(userId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    await wishlistService.addItem(userId, productId);
    res.status(201).json({ message: 'Added to wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    await wishlistService.removeItem(userId, req.params.productId);
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
