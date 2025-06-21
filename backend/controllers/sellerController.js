const Product = require('../models/Product');
const Order = require('../models/Order');
const Notification = require('../models/Notification');

// POST /api/seller/products
const addProduct = async (req, res) => {
  try {
    console.log('req.user:', req.user); // Should log userId and role

    const newProduct = await Product.create({
      ...req.body,
      sellerId: req.user.userId  // ✅ Correct field name
    });

    res.status(201).json({
      productId: newProduct._id,
      message: 'Product added successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error adding product',
      error: err.message
    });
  }
};

// PUT /api/seller/products/:id
const updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating product',
      error: err.message
    });
  }
};

// DELETE /api/seller/products/:id
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting product',
      error: err.message
    });
  }
};

// GET /api/seller/products
const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.userId }); // ✅ Fix here
    res.json({ products });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching products',
      error: err.message
    });
  }
};

// GET /api/seller/orders
const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user.userId }); // ✅ Fix here
    res.json({ orders });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching orders',
      error: err.message
    });
  }
};

// GET /api/seller/notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ sellerId: req.user.userId }); // ✅ Fix here
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching notifications',
      error: err.message
    });
  }
};

// PUT /api/seller/notifications/:id
const markNotificationRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating notification',
      error: err.message
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getSellerOrders,
  getNotifications,
  markNotificationRead
};
