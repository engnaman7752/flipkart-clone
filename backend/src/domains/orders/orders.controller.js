const ordersService = require('./orders.service');
const emailService = require('../../services/email.service');

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await ordersService.getOrders(userId);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, subtotal, total } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;

    // LLD: Transactional Outbox Pattern executed within the service layer
    const orderId = await ordersService.createOrder(
      userId, 
      orderItems, 
      shippingAddress, 
      subtotal, 
      total
    );

    // Send asynchronous email notification and wait for the preview URL
    const previewUrl = await emailService.sendOrderConfirmationEmail(userEmail, orderId, total);

    res.status(201).json({ message: 'Order placed successfully', orderId, emailPreviewUrl: previewUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getOrders,
  placeOrder
};
