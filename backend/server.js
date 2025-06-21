const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Route registration
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/cart', cartRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  
  // Product route (if needed for testing product addition)
  const Product = require('./models/Product');

  app.post('/api/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.json({ message: 'Product added', productId: product._id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
