import Redis from 'ioredis';

let redisClient = null;

export const getRedisClient = () => {
  if (!redisClient) {
    redisClient = process.env.REDIS_URL
      ? new Redis(process.env.REDIS_URL, {
          maxRetriesPerRequest: 3,
          lazyConnect: true,
          retryStrategy(times) {
            if (times > 10) return null;
            return Math.min(times * 100, 3000);
          },
        })
      : new Redis({
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: process.env.REDIS_PORT || 6379,
          maxRetriesPerRequest: 3,
          lazyConnect: true,
          retryStrategy(times) {
            if (times > 10) return null;
            return Math.min(times * 100, 3000);
          },
        });

    redisClient.on('connect', () => console.log('[Redis] Connected'));
    redisClient.on('error', (err) => console.error('[Redis] Error:', err.message));
  }
  return redisClient;
};

process.on('SIGTERM', async () => {
  if (redisClient) await redisClient.quit();
});

export default getRedisClient;