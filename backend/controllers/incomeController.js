import Income from '../models/Income.js';
import { invalidateCache, CacheKeys } from '../middleware/cache.js';
import reportQueue from '../queues/reportQueue.js';
import fs from 'fs';

export const addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date, imageUrl } = req.body;
    if (!source || !amount || !date)
      return res.status(400).json({ message: 'All fields are required' });

    const newIncome = await Income.create({
      userId, icon, source, amount, date: new Date(date), imageUrl,
    });

    await invalidateCache(CacheKeys.allIncome(userId), CacheKeys.dashboard(userId));
    res.status(200).json(newIncome);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllIncome = async (req, res) => {
  try {
    const income = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    await Income.findByIdAndDelete(req.params.id);
    await invalidateCache(CacheKeys.allIncome(userId), CacheKeys.dashboard(userId));
    res.json({ message: 'Income deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const downloadIncomeExcel = async (req, res) => {
  try {
    const job = await reportQueue.add('income-report', { userId: req.user.id });
    res.status(202).json({
      message: 'Report generation started',
      jobId: job.id,
      statusUrl: `/api/v1/income/report/status/${job.id}`,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getIncomeReportStatus = async (req, res) => {
  try {
    const job = await reportQueue.getJob(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const state = await job.getState();
    const result = job.returnvalue;

    if (state === 'completed' && result?.filePath && fs.existsSync(result.filePath)) {
      return res.download(result.filePath, 'income_report.xlsx', () => {
        fs.unlink(result.filePath, () => {});
      });
    }

    res.json({ jobId: job.id, state, progress: job.progress() });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};