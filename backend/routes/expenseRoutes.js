import express from 'express';
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel
} from '../controllers/expenseController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for expense
router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.get('/downloadexcel', protect, downloadExpenseExcel);
router.delete('/:id', protect, deleteExpense);

export default router;
