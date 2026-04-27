import getRedisClient from '../config/redis.js';

export const CacheKeys = {
  dashboard:  (userId) => `finesight:dashboard:${userId}`,
  allIncome:  (userId) => `finesight:income:all:${userId}`,
  allExpense: (userId) => `finesight:expense:all:${userId}`,
  userProfile:(userId) => `finesight:user:${userId}`,
};

const DEFAULT_TTL = 300;

export const cacheMiddleware = (keyFn, ttl = DEFAULT_TTL) => async (req, res, next) => {
  const redis = getRedisClient();
  const userId = req.user?._id?.toString() || req.user?.id?.toString();

  // skip cache if no userId
  if (!userId) return next();

  const key = keyFn(userId);

  // 1. Try reading from cache
  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log(`[Cache HIT] ${key}`);
      return res.json(JSON.parse(cached));
    }
    console.log(`[Cache MISS] ${key}`);
  } catch (err) {
    console.warn('[Cache] Redis read error, skipping cache:', err.message);
    return next();
  }

  // 2. Intercept res.json to store response in cache
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    // fire and forget — do NOT await, do NOT make res.json async
    redis.setex(key, ttl, JSON.stringify(data))
      .catch(err => console.warn('[Cache] Store error:', err.message));

    return originalJson(data); // send response immediately
  };

  next();
};

export const invalidateCache = async (...keys) => {
  if (!keys.length) return;
  const redis = getRedisClient();
  try {
    await redis.del(...keys);
    console.log(`[Cache] Invalidated: ${keys.join(', ')}`);
  } catch (err) {
    console.warn('[Cache] Invalidate error:', err.message);
  }
};