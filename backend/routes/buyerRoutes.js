const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // adjust as per your structure

// Controllers (you’ll need to implement or import these)
const {
  browseProducts,
  getRecommendedProducts,
  addToCart,
  viewCart,
  removeFromCart,
  checkout,
  verifyPayment,
  getOrders,
  trackOrder
} = require('../controllers/buyerController');

// Browse products with filters
router.get('/products', authMiddleware, browseProducts);

// Get recommended products
router.get('/products/recommended', authMiddleware, getRecommendedProducts);

// Add item to cart
router.post('/cart', authMiddleware, addToCart);

// View cart
router.get('/cart', authMiddleware, viewCart);

// Remove item from cart
router.delete('/cart/:productId', authMiddleware, removeFromCart);

// Checkout (Razorpay)
router.post('/checkout', authMiddleware, checkout);

// Verify payment
router.post('/payment/verify', authMiddleware, verifyPayment);

// Get order history
router.get('/orders', authMiddleware, getOrders);

// Track delivery
router.get('/orders/:id/track', authMiddleware, trackOrder);

module.exports = router;
