const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productsRouter = require('./src/domains/products/products.router');
const cartRouter = require('./src/domains/cart/cart.router');
const ordersRouter = require('./src/domains/orders/orders.router');
const wishlistRouter = require('./src/domains/wishlist/wishlist.router');
const authRouter = require('./src/domains/auth/auth.router');
const userRouter = require('./src/domains/users/user.router');
const paymentRouter = require('./src/domains/payment/payment.router');
const { startWorker } = require('./worker');

const app = express();
app.use(cors());
app.use(express.json());

// HLD: Domain Routes — each domain is self-contained (Modular Monolith)
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/payment', paymentRouter);

app.get('/api/health', (req, res) => {
    res.json({ message: "Backend is live!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    startWorker();
});