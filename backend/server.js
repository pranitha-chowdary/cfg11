const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route to test server
app.get('/', (req, res) => {
  res.send('E-Commerce Platform API');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
