const express = require('express');
const {
  getAnalytics,
  appointShgSeller,
  updateShgSeller,
  deleteShgSeller
} = require('../controllers/adminController');

const {
  protect,
  restrictTo
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/analytics', protect, restrictTo('admin'), getAnalytics);
router.post('/shg', protect, restrictTo('admin'), appointShgSeller);
router.put('/shg/:id', protect, restrictTo('admin'), updateShgSeller);
router.delete('/shg/:id', protect, restrictTo('admin'), deleteShgSeller);

module.exports = router;
