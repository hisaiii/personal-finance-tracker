import express from 'express';
import {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel
} from '../controllers/incomeController.js';
import upload from "../middleware/uploadMiddleware.js"; 
import { uploadImageToCloudinary } from '../controllers/cloudinaryUploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncome);
router.get('/downloadexcel', protect, downloadIncomeExcel);
router.delete('/:id', protect, deleteIncome);
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
