import express from 'express';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getSellerOrders,
  getNotifications,
  markNotificationRead
} from '../controllers/sellerController.js';

import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/products', protect, restrictTo('seller'), addProduct);                 // POST /api/seller/products
router.put('/products/:id', protect, restrictTo('seller'), updateProduct);           // PUT /api/seller/products/:id
router.delete('/products/:id', protect, restrictTo('seller'), deleteProduct);        // DELETE /api/seller/products/:id
router.get('/products', protect, restrictTo('seller'), getSellerProducts);           // GET /api/seller/products
router.get('/orders', protect, restrictTo('seller'), getSellerOrders);               // GET /api/seller/orders
router.get('/notifications', protect, restrictTo('seller'), getNotifications);       // GET /api/seller/notifications
router.put('/notifications/:id', protect, restrictTo('seller'), markNotificationRead); // PUT /api/seller/notifications/:id

export default router;
