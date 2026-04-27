import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import getRedisClient from '../config/redis.js';
import { CacheKeys } from './cache.js';

const USER_CACHE_TTL = 600; // 10 minutes

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Not authorised, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId  = decoded.id;
    const redis   = getRedisClient();
    const cacheKey = CacheKeys.userProfile(userId);

    let user = null;

    // 1. Try Redis first
    try {
      const cached = await redis.get(cacheKey);
      if (cached) user = JSON.parse(cached);
    } catch (err) {
      console.warn('[Auth] Redis miss, going to DB');
    }

    // 2. Cache miss → hit MongoDB
    if (!user) {
      user = await User.findById(userId).select('-password').lean();
      if (!user) return res.status(401).json({ message: 'User not found' });
      try {
        await redis.setex(cacheKey, USER_CACHE_TTL, JSON.stringify(user));
      } catch (_) {}
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorised, token failed' });
  }
};