import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import { fileURLToPath } from 'url'
import incomeRoutes from './routes/incomeRoutes.js'
import exopenseRoutes from './routes/expenseRoutes.js'


// Load environment variables
dotenv.config();

const app = express();

// 👉 Middleware to handle CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 👉 Middleware to parse JSON requests
app.use(express.json());

  
connectDB();
// 👉 Setup the port
const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/income",incomeRoutes)
app.use("/api/v1/expense",exopenseRoutes)



// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// 👉 Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
