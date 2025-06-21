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

// Only accessible by admin
router.get('/analytics', protect, restrictTo('admin'), getAnalytics);              // GET /api/admin/analytics
router.post('/shg', protect, restrictTo('admin'), appointShgSeller);               // POST /api/admin/shg
router.put('/shg/:id', protect, restrictTo('admin'), updateShgSeller);             // PUT /api/admin/shg/:id
router.delete('/shg/:id', protect, restrictTo('admin'), deleteShgSeller);          // DELETE /api/admin/shg/:id

module.exports = router;
