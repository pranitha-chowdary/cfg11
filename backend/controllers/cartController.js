// controllers/cartController.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  // Step 1: Validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID format' });
  }

  try {
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid productId or quantity' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ buyerId: req.userId });
    if (!cart) {
      cart = new Cart({ buyerId: req.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json({ cartId: cart._id, message: 'Product added to cart' });

  } catch (error) {
    res.status(400).json({ error: `Failed to add to cart: ${error.message}` });
  }
};

module.exports = {
  addToCart,
};
