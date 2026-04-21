import { env } from '@/config/env'
import Redis from 'ioredis'

declare global {
  var _redis: Redis | undefined
}

const createRedisClient = () => {
  return new Redis(env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 2,
    enableReadyCheck: true,

    retryStrategy(times) {
      if (times > 3) return null
      return Math.min(times * 200, 2000)
    },
  })
}

export const redis = global._redis ?? (global._redis = createRedisClient())

export async function ensureRedisConnection() {
  try {
    if (redis.status !== 'ready') {
      await redis.connect()
    }

    const res = await redis.ping()

    if (res === 'PONG') {
      console.log('✅ Redis is healthy')
      return true
    }

    return false
  } catch (err) {
    console.error('❌ Redis connection failed:', err)
    return false
  }
}
