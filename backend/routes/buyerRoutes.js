const express = require('express');
const router = express.Router();

const {
  browseProducts,
  getRecommendedProducts,
  addToCart,
  viewCart,
  removeFromCart,
  getOrders,
  trackOrder,
} = require('../controllers/buyerController');

const { protect } = require('../middleware/authMiddleware');

// Public route - browse products
router.get('/products', browseProducts);

// Protected routes
router.get('/products/recommended', protect, getRecommendedProducts);
router.post('/cart', protect, addToCart);
router.get('/cart', protect, viewCart);
router.delete('/cart/:productId', protect, removeFromCart);
router.get('/orders', protect, getOrders);
router.get('/orders/:id/track', protect, trackOrder);

// Test route (optional - for verifying route setup)
router.get('/test', (req, res) => {
  res.send('✅ Buyer routes working!');
});

module.exports = router;
