import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getDashboardData } from '../controllers/dashboardController.js';
import { cacheMiddleware, CacheKeys } from '../middleware/cache.js';

const router = express.Router();

router.get('/', protect, cacheMiddleware(CacheKeys.dashboard, 300), getDashboardData);

export default router;