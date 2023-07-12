const Product = require('../Models/product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, images } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      images,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Update a specific product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category, quantity, images } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        category,
        quantity,
        images,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Delete a specific product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};