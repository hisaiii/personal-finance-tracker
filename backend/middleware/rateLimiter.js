import getRedisClient from '../config/redis.js';

export const rateLimiter = ({
  windowMs = 60_000,
  max = 60,
  keyPrefix = 'rl',
} = {}) => async (req, res, next) => {
  const redis = getRedisClient();
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const key = `finesight:${keyPrefix}:${ip}`;
  const windowSec = Math.ceil(windowMs / 1000);

  try {
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, windowSec);
    const [[incrErr, count]] = await pipeline.exec();
    if (incrErr) throw incrErr;

    res.set({
      'X-RateLimit-Limit': max,
      'X-RateLimit-Remaining': Math.max(0, max - count),
    });

    if (count > max) {
      return res.status(429).json({
        message: `Too many requests. Try again in ${windowSec} seconds.`,
      });
    }
  } catch (err) {
    console.warn('[RateLimit] Redis error, skipping:', err.message);
  }

  next();
};

export const authLimiter   = rateLimiter({ windowMs: 15 * 60_000, max: 10,  keyPrefix: 'auth'   });
export const apiLimiter    = rateLimiter({ windowMs: 60_000,       max: 100, keyPrefix: 'api'    });
export const uploadLimiter = rateLimiter({ windowMs: 60_000,       max: 10,  keyPrefix: 'upload' });