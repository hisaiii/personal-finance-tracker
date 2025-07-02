import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import { fileURLToPath } from 'url'
import incomeRoutes from './routes/incomeRoutes.js'
import exopenseRoutes from './routes/expenseRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import splitwiseRoutes from './routes/splitwiseRoutes.js';
import session from 'express-session';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';

// Load environment variables
dotenv.config();

const app = express();

// 👉 Middleware to handle CORS
app.use(cors({
  origin: process.env.CLIENT_URL||"http://localhost:5173",
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

// Routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", exopenseRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)
app.use('/api/v1/splitwise', splitwiseRoutes);

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 👉 Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});