const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');

// Get analytics
const getAnalytics = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.productId');
    const productSales = {};
    
    orders.forEach(order => {
      order.products.forEach(p => {
        const productId = p.productId._id.toString();
        if (!productSales[productId]) {
          productSales[productId] = {
            productId,
            name: p.productId.name,
            totalSold: 0,
          };
        }
        productSales[productId].totalSold += p.quantity;
      });
    });

    const mostSold = Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);

    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const categories = [...new Set(orders.flatMap(order => order.products.map(p => p.productId.category)))];
    const topCategories = categories.slice(0, 3);

    res.json({
      mostSold,
      totalSales,
      totalOrders,
      topCategories,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch analytics: ${error.message}` });
  }
};

// Appoint SHG seller
const appointShgSeller = async (req, res) => {
  try {
    const { email, name, address, phone } = req.body;
    if (!email || !name || !address || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash('defaultpassword123', 10);
    const user = new User({
      email,
      password: hashedPassword,
      role: 'shg_seller',
      name,
      address,
      phone,
    });
    await user.save();

    res.json({ userId: user._id, message: 'SHG seller appointed' });
  } catch (error) {
    res.status(400).json({ error: `Failed to appoint SHG seller: ${error.message}` });
  }
};

// Update SHG seller
const updateShgSeller = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'shg_seller') {
      return res.status(404).json({ error: 'SHG seller not found' });
    }

    if (name) user.name = name;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();

    res.json({ message: 'SHG seller updated' });
  } catch (error) {
    res.status(400).json({ error: `Failed to update SHG seller: ${error.message}` });
  }
};

// Remove SHG seller
const removeShgSeller = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'shg_seller') {
      return res.status(404).json({ error: 'SHG seller not found' });
    }

    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'SHG seller removed' });
  } catch (error) {
    res.status(400).json({ error: `Failed to remove SHG seller: ${error.message}` });
  }
};

module.exports = {
  getAnalytics,
  appointShgSeller,
  updateShgSeller,
  removeShgSeller,
};