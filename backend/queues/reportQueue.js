import Bull from 'bull';
import * as xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Income from '../models/Income.js';
import Expense from '../models/Expense.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

export const reportQueue = new Bull('report-generation', REDIS_URL, {
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: 20,
    removeOnFail: 50,
  },
});

// make sure uploads folder exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

reportQueue.process('expense-report', async (job) => {
  const { userId } = job.data;
  const expenses = await Expense.find({ userId }).sort({ date: -1 });
  const data = expenses.map((item) => ({
    Category: item.category,
    Amount: item.amount,
    Date: item.date.toISOString().split('T')[0],
  }));
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(data), 'Expenses');
  const outputPath = path.join(uploadsDir, `expense_${userId}.xlsx`);
  xlsx.writeFile(wb, outputPath);
  return { filePath: outputPath };
});

reportQueue.process('income-report', async (job) => {
  const { userId } = job.data;
  const income = await Income.find({ userId }).sort({ date: -1 });
  const data = income.map((item) => ({
    Source: item.source,
    Amount: item.amount,
    Date: item.date.toISOString().split('T')[0],
  }));
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(data), 'Income');
  const outputPath = path.join(uploadsDir, `income_${userId}.xlsx`);
  xlsx.writeFile(wb, outputPath);
  return { filePath: outputPath };
});

reportQueue.on('completed', (job, result) => {
  console.log(`[Queue] Job ${job.id} done → ${result.filePath}`);
});

reportQueue.on('failed', (job, err) => {
  console.error(`[Queue] Job ${job.id} failed:`, err.message);
});

export default reportQueue;