const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const Notification = require('../models/Notification');
const router = express.Router();

// Middleware to verify JWT and seller role
const authSeller = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'shg_seller') return res.status(403).json({ error: 'Access denied' });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// GET /api/seller/orders - View all orders for the seller
router.get('/orders', authSeller, async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.userId }).populate('products.productId');
    res.json({
      orders: orders.map(order => ({
        id: order._id,
        buyerId: order.buyerId,
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
    res.status(500).json({ error: error.message });
  }
});

// GET /api/seller/notifications - View notifications
router.get('/notifications', authSeller, async (req, res) => {
  try {
    const notifications = await Notification.find({ sellerId: req.userId }).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/seller/notifications/:id - Mark notification as read
router.put('/notifications/:id', authSeller, async (req, res) => {
  try {
    const notification = await Notification.findOne({ _id: req.params.id, sellerId: req.userId });
    if (!notification) return res.status(404).json({ error: 'Notification not found' });

    notification.isRead = true;
    await notification.save();
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;