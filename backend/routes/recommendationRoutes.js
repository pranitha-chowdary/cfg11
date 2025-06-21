const express = require('express');
const { getRecommendations } = require('../controllers/recommendationController');

const router = express.Router();

router.get('/:buyerId', getRecommendations);  // GET /api/recommendations/:buyerId

module.exports = router;
