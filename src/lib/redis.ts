import { env } from '@/config/env'
import Redis from 'ioredis'

declare global {
  var _redis: Redis | undefined
}

const createRedisClient = () => {
  const client = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 2,
    connectTimeout: 10000,

    retryStrategy(times) {
      if (times > 3) return null
      return Math.min(times * 200, 2000)
    },
  })

  client.on('connect', () => {
    console.log('🟡 Redis connecting...')
  })

  client.on('ready', () => {
    console.log('🟢 Redis ready (connected)')
  })

  client.on('error', (err) => {
    console.error('🔴 Redis error:', err.message)
  })

  client.on('end', () => {
    console.log('⚫ Redis connection closed')
  })

  return client
}

export const redis = global._redis ?? (global._redis = createRedisClient())

export async function ensureRedisConnection() {
  if (redis.status === 'ready') return

  try {
    await redis.connect()
  } catch (err) {
    console.error('Redis connect failed:', err)
  }
}
