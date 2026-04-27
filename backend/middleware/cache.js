// import getRedisClient from '../config/redis.js';

// export const CacheKeys = {
//   dashboard: (userId) => `finesight:dashboard:${userId}`,
//   allIncome:  (userId) => `finesight:income:all:${userId}`,
//   allExpense: (userId) => `finesight:expense:all:${userId}`,
//   userProfile:(userId) => `finesight:user:${userId}`,
// };

// const DEFAULT_TTL = 300; // 5 minutes

// export const cacheMiddleware = (keyFn, ttl = DEFAULT_TTL) => async (req, res, next) => {
//   const redis = getRedisClient();
//   const key = keyFn(req.user?.id);

//   try {
//     const cached = await redis.get(key);
//     if (cached) {
//       console.log(`[Cache HIT] ${key}`);
//       return res.json(JSON.parse(cached));
//     }
//     console.log(`[Cache MISS] ${key}`);
//   } catch (err) {
//     console.warn('[Cache] Redis error, skipping:', err.message);
//   }

//   const originalJson = res.json.bind(res);
//   res.json = async (data) => {
//     try {
//       await redis.setex(key, ttl, JSON.stringify(data));
//     } catch (err) {
//       console.warn('[Cache] Failed to store:', err.message);
//     }
//     return originalJson(data);
//   };

//   next();
// };

// export const invalidateCache = async (...keys) => {
//   const redis = getRedisClient();
//   try {
//     if (keys.length > 0) {
//       await redis.del(...keys);
//       console.log(`[Cache] Invalidated: ${keys.join(', ')}`);
//     }
//   } catch (err) {
//     console.warn('[Cache] Failed to invalidate:', err.message);
//   }
// };

import getRedisClient from '../config/redis.js';

export const CacheKeys = {
  dashboard:  (userId) => `finesight:dashboard:${userId}`,
  allIncome:  (userId) => `finesight:income:all:${userId}`,
  allExpense: (userId) => `finesight:expense:all:${userId}`,
  userProfile:(userId) => `finesight:user:${userId}`,
};

// temporarily disabled — just passes through
export const cacheMiddleware = (keyFn, ttl = 300) => (req, res, next) => {
  next();
};

export const invalidateCache = async (...keys) => {
  // no-op for now
};