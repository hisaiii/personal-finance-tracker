import express from 'express';
import {
  addExpense, getAllExpense, deleteExpense,
  downloadExpenseExcel, getExpenseReportStatus,
} from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { uploadImageToCloudinary } from '../controllers/cloudinaryUploadController.js';
import { cacheMiddleware, CacheKeys } from '../middleware/cache.js';
import { apiLimiter, uploadLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(apiLimiter);
router.post('/add',                    protect, addExpense);
router.get('/get',                     protect, cacheMiddleware(CacheKeys.allExpense, 300), getAllExpense);
router.get('/downloadexcel',           protect, downloadExpenseExcel);
router.get('/report/status/:jobId',    protect, getExpenseReportStatus);
router.delete('/:id',                  protect, deleteExpense);
router.post('/upload-image',           protect, uploadLimiter, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'folder', maxCount: 1 }]), uploadImageToCloudinary);

export default router;