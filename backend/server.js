import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
import {RedisStore} from 'connect-redis';

import connectDB from './config/db.js';
import getRedisClient from './config/redis.js';
import authRoutes from './routes/authRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import splitwiseRoutes from './routes/splitwiseRoutes.js';
import './config/splitwiseOAuth2.js';

dotenv.config();

const app = express();
const _dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Connect DB and Redis FIRST ─────────────────────────
connectDB();
const redis = getRedisClient(); // ✅ declared before it's used below

// ── CORS ───────────────────────────────────────────────
app.use(cors({
  origin: "https://personal-finance-tracker-8tdm.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ── Body parser ────────────────────────────────────────
app.use(express.json());

// ── Session (ONE only, with Redis store) ───────────────
app.use(session({
  store: new RedisStore({ client: redis }), // ✅ redis is declared above
  secret: process.env.SESSION_SECRET || 'finesight-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: auto,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// ── Passport ───────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// ── API Routes ─────────────────────────────────────────
app.use("/api/v1/auth",      authRoutes);
app.use("/api/v1/income",    incomeRoutes);
app.use("/api/v1/expense",   expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/splitwise", splitwiseRoutes);

// ── Static files ───────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(_dirname, "frontend/dist")));

// ── Error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ── SPA catch-all (must be last) ──────────────────────
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// ── Start server ───────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});