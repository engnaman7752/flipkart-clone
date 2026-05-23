const productsService = require('./products.service');
const groqService = require('../../services/groqService');

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

const searchByImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const keyword = await groqService.analyzeImage(image);

    if (!keyword) {
      return res.json({ keyword: '', products: [] });
    }

    // Search database products where name matches the detected keyword
    const products = await productsService.findAllProducts({ search: keyword });

    res.json({
      keyword,
      products
    });
  } catch (err) {
    console.error('[Image Search Error]', err);
    res.status(500).json({ error: 'Failed to process image search: ' + err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  searchByImage
};
