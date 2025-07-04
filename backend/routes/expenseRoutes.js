import express from 'express';
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel
} from '../controllers/expenseController.js';

import { protect } from '../middleware/authMiddleware.js';
import upload from "../middleware/uploadMiddleware.js"; 
import { uploadImageToCloudinary } from '../controllers/cloudinaryUploadController.js';
const router = express.Router();

// Routes for expense
router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.get('/downloadexcel', protect, downloadExpenseExcel);
router.delete('/:id', protect, deleteExpense);
router.post(
  "/upload-image",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "folder", maxCount: 1 }
  ]),
  uploadImageToCloudinary
);

export default router;
