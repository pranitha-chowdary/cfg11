const express = require('express');
const router = express.Router();

// ✅ Import the required controller functions
const {
  getAnalytics,
  appointShgSeller,
  updateShgSeller,
  removeShgSeller
} = require('../controllers/adminController');

// ✅ Use the proper middleware
const { protect, restrictTo } = require('../middleware/authMiddleware');
const authMiddleware = protect;
const adminMiddleware = restrictTo('admin');

// ✅ Define routes
router.get('/analytics', authMiddleware, adminMiddleware, getAnalytics);
router.post('/shg', authMiddleware, adminMiddleware, appointShgSeller);
router.put('/shg/:id', authMiddleware, adminMiddleware, updateShgSeller);
router.delete('/shg/:id', authMiddleware, adminMiddleware, removeShgSeller);

module.exports = router;
