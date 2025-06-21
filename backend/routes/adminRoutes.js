import express from 'express';
import {
  getAnalytics,
  appointShgSeller,
  updateShgSeller,
  deleteShgSeller,
} from '../controllers/adminController.js';

import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/analytics', protect, restrictTo('admin'), getAnalytics);
router.post('/shg', protect, restrictTo('admin'), appointShgSeller);
router.put('/shg/:id', protect, restrictTo('admin'), updateShgSeller);
router.delete('/shg/:id', protect, restrictTo('admin'), deleteShgSeller);

export default router;
