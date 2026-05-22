const express = require('express');
const router = express.Router();
const ordersController = require('./orders.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.get('/', authMiddleware, ordersController.getOrders);
router.post('/', authMiddleware, ordersController.placeOrder);

module.exports = router;
