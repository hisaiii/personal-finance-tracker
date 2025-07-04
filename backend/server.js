import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import { fileURLToPath } from 'url'
import incomeRoutes from './routes/incomeRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js' // Fixed typo: exopenseRoutes -> expenseRoutes
import dashboardRoutes from './routes/dashboardRoutes.js'
import splitwiseRoutes from './routes/splitwiseRoutes.js';
import session from 'express-session';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const _dirname = path.resolve()

// 👉 Middleware to handle CORS
app.use(cors({
  origin: "https://personal-finance-tracker-8tdm.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Important for sessions
}));

// 👉 Middleware to parse JSON requests
app.use(express.json());

connectDB();

// 👉 Setup the port
const PORT = process.env.PORT || 5000;

// Session middleware - configure before passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'splitwise-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false, // Changed to false for better security
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Fixed OAuth2 Strategy
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://secure.splitwise.com/oauth/authorize',
      tokenURL: 'https://secure.splitwise.com/oauth/token',
      clientID: process.env.SPLITWISE_CONSUMER_KEY,
      clientSecret: process.env.SPLITWISE_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    // This function should return user data, not handle redirects
    async function (accessToken, refreshToken, profile, done) {
      try {
        // You can fetch user data from Splitwise here if needed
        const user = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile
        };

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// API Routes - These must come FIRST
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes) // Fixed variable name
app.use("/api/v1/dashboard", dashboardRoutes)
app.use('/api/v1/splitwise', splitwiseRoutes);

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Serve static files from frontend build
app.use(express.static(path.join(_dirname, "frontend/dist")))

// Error handling middleware - MUST come before catch-all route
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Catch-all route - MUST be the very last route
// Only serve index.html for non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  // This regex matches all routes that don't start with '/api'
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

// 👉 Start the server
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});