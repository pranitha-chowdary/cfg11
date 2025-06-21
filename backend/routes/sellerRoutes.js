const express = require('express');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getSellerOrders,
  getNotifications,
  markNotificationRead
} = require('../controllers/sellerController');

const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Protected SHG Seller Routes
router.post('/products', protect, restrictTo('shg_seller'), addProduct);                 // Add product
router.put('/products/:id', protect, restrictTo('shg_seller'), updateProduct);           // Update product
router.delete('/products/:id', protect, restrictTo('shg_seller'), deleteProduct);        // Delete product
router.get('/products', protect, restrictTo('shg_seller'), getSellerProducts);           // List seller products
router.get('/orders', protect, restrictTo('shg_seller'), getSellerOrders);               // List seller orders
router.get('/notifications', protect, restrictTo('shg_seller'), getNotifications);       // List notifications
router.put('/notifications/:id', protect, restrictTo('shg_seller'), markNotificationRead); // Mark as read

module.exports = router;
