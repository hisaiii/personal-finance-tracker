import Expense from '../models/Expense.js';
import { invalidateCache, CacheKeys } from '../middleware/cache.js';
import reportQueue from '../queues/reportQueue.js';
import fs from 'fs';

export const addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount, date, imageUrl } = req.body;
    if (!category || !amount || !date)
      return res.status(400).json({ message: 'All fields are required' });

    const newExpense = await Expense.create({
      userId, icon, category, amount, date: new Date(date), imageUrl,
    });

    // bust stale cache
    await invalidateCache(CacheKeys.allExpense(userId), CacheKeys.dashboard(userId));
    res.status(200).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    await Expense.findByIdAndDelete(req.params.id);
    await invalidateCache(CacheKeys.allExpense(userId), CacheKeys.dashboard(userId));
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const downloadExpenseExcel = async (req, res) => {
  try {
    const job = await reportQueue.add('expense-report', { userId: req.user.id });
    res.status(202).json({
      message: 'Report generation started',
      jobId: job.id,
      statusUrl: `/api/v1/expense/report/status/${job.id}`,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getExpenseReportStatus = async (req, res) => {
  try {
    const job = await reportQueue.getJob(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const state = await job.getState();
    const result = job.returnvalue;

    if (state === 'completed' && result?.filePath && fs.existsSync(result.filePath)) {
      return res.download(result.filePath, 'expense_report.xlsx', () => {
        fs.unlink(result.filePath, () => {});
      });
    }

    res.json({ jobId: job.id, state, progress: job.progress() });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};