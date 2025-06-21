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
const authMiddleware = require('../middleware/authMiddleware');

router.get('/products', browseProducts);
router.get('/products/recommended', authMiddleware, getRecommendedProducts);
router.post('/cart', authMiddleware, addToCart);
router.get('/cart', authMiddleware, viewCart);
router.delete('/cart/:productId', authMiddleware, removeFromCart);
router.get('/orders', authMiddleware, getOrders);
router.get('/orders/:id/track', authMiddleware, trackOrder);

module.exports = router;