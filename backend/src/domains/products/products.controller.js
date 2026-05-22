const productsService = require('./products.service');

const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const products = await productsService.findAllProducts({ search, category });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productsService.findProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductById
};
