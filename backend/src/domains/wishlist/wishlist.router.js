const express = require('express');
const router = express.Router();
const wishlistController = require('./wishlist.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.get('/', authMiddleware, wishlistController.getWishlist);
router.post('/', authMiddleware, wishlistController.addToWishlist);
router.delete('/:productId', authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;
