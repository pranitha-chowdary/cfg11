import express from 'express';
import { getRecommendations } from '../controllers/recommendationController.js';

const router = express.Router();

router.get('/:buyerId', getRecommendations);  // GET /api/recommendations/:buyerId

export default router;
