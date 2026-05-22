const express = require('express');
const router = express.Router();
const cartController = require('./cart.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, cartController.addToCart);
router.patch('/:productId', authMiddleware, cartController.updateQuantity);
router.delete('/:productId', authMiddleware, cartController.removeFromCart);

module.exports = router;
