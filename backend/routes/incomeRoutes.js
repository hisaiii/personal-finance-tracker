import express from 'express';
import {
  addIncome, getAllIncome, deleteIncome,
  downloadIncomeExcel, getIncomeReportStatus,
} from '../controllers/incomeController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { uploadImageToCloudinary } from '../controllers/cloudinaryUploadController.js';
import { cacheMiddleware, CacheKeys } from '../middleware/cache.js';
import { apiLimiter, uploadLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(apiLimiter);
router.post('/add',                    protect, addIncome);
router.get('/get',                     protect, cacheMiddleware(CacheKeys.allIncome, 300), getAllIncome);
router.get('/downloadexcel',           protect, downloadIncomeExcel);
router.get('/report/status/:jobId',    protect, getIncomeReportStatus);
router.delete('/:id',                  protect, deleteIncome);
router.post('/upload-image',           protect, uploadLimiter, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'folder', maxCount: 1 }]), uploadImageToCloudinary);

export default router;