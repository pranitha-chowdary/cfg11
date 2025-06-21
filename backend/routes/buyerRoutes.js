import express from 'express';
import {
  getAllProducts,
  getRecommendedProducts,
  addToCart,
  getCart,
  removeFromCart,
  checkout,
  verifyPayment,
  getOrders,
  trackOrder
} from '../controllers/buyerController.js';

import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/products', getAllProducts);                                      // GET /api/buyer/products
router.get('/products/recommended', protect, restrictTo('buyer'), getRecommendedProducts); // GET /api/buyer/products/recommended

router.post('/cart', protect, restrictTo('buyer'), addToCart);                // POST /api/buyer/cart
router.get('/cart', protect, restrictTo('buyer'), getCart);                   // GET /api/buyer/cart
router.delete('/cart/:productId', protect, restrictTo('buyer'), removeFromCart); // DELETE /api/buyer/cart/:productId

router.post('/checkout', protect, restrictTo('buyer'), checkout);            // POST /api/buyer/checkout
router.post('/payment/verify', protect, restrictTo('buyer'), verifyPayment); // POST /api/buyer/payment/verify

router.get('/orders', protect, restrictTo('buyer'), getOrders);              // GET /api/buyer/orders
router.get('/orders/:id/track', protect, restrictTo('buyer'), trackOrder);   // GET /api/buyer/orders/:id/track

export default router;
