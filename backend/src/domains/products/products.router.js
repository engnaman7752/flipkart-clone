// HLD Decision: Modular Monolith
// We use a Domain-Driven folder structure (products, cart, orders) rather than
// separating by file type (controllers, routes, services). This simulates microservice boundaries,
// making it easy to split this monolith into separate services in the future.

const express = require('express');
const router = express.Router();
const productsController = require('./products.controller');

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);

module.exports = router;
