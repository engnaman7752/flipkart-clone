const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyPayment } = require('./payment.controller');
const authenticate = require('../../middleware/auth.middleware');

router.post('/create-order', authenticate, createRazorpayOrder);
router.post('/verify', authenticate, verifyPayment);

module.exports = router;
