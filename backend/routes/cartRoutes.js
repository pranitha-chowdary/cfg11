const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Middleware to set req.userId for controller compatibility
const setUserId = (req, res, next) => {
  if (req.user && req.user.userId) {
    req.userId = req.user.userId;
  }
  next();
};

router.post('/', protect, setUserId, addToCart);

module.exports = router;