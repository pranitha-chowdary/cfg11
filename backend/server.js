const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Basic route to test server
app.get('/', (req, res) => {
  res.send('E-Commerce Platform API');
});

// TODO: Add API routes here (e.g., auth, admin, seller, buyer)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});