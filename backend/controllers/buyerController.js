const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

// Browse products with filters
const browseProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const query = {};
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    const products = await Product.find(query);
    res.json({
      products: products.map(p => ({
        id: p._id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        images: p.images,
        isUnique: p.isUnique,
        stock: p.stock,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch products: ${error.message}` });
  }
};

// Get recommended products
const getRecommendedProducts = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.userId }).populate('products.productId');
    const categories = [...new Set(orders.flatMap(order => order.products.map(p => p.productId.category)))];
    const products = await Product.find({
      category: { $in: categories.length ? categories : ['Handicrafts', 'Food'] },
    }).limit(5);
    res.json({
      products: products.map(p => ({
        id: p._id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        images: p.images,
        isUnique: p.isUnique,
        stock: p.stock,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch recommended products: ${error.message}` });
  }
};

// Add product to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
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

    let cart = await Cart.findOne({ buyerId: req.user.userId });
    if (!cart) {
      cart = new Cart({ buyerId: req.user.userId, items: [] });
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

// View cart
const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyerId: req.user.userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json({
      items: cart.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch cart: ${error.message}` });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyerId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(400).json({ error: `Failed to remove from cart: ${error.message}` });
  }
};

// Get order history
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.userId }).populate('products.productId');
    res.json({
      orders: orders.map(order => ({
        id: order._id,
        products: order.products.map(p => ({
          productId: p.productId._id,
          name: p.productId.name,
          quantity: p.quantity,
        })),
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch orders: ${error.message}` });
  }
};

// Track delivery
const trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, buyerId: req.user.userId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({
      orderId: order._id,
      status: order.status,
      deliveryDetails: {
        address: order.deliveryAddress,
        estimatedDelivery: new Date(order.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to track order: ${error.message}` });
  }
};

module.exports = {
  browseProducts,
  getRecommendedProducts,
  addToCart,
  viewCart,
  removeFromCart,
  getOrders,
  trackOrder,
};
