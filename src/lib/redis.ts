// import { env } from '@/config/env'
import Redis from 'ioredis'

declare global {
  var _redis: Redis | undefined
}

const client = new Redis(
  'rediss://default:gQAAAAAAAZJLAAIocDE3MmM1M2E5NDliZGU0MzFmOTI2ZjZmZDMzM2JiODRkZnAxMTAyOTg3@above-pelican-102987.upstash.io:6379',
)
await client.set('foo', 'bar')

export const redis = global._redis ?? (global._redis = client)

export async function ensureRedisConnection() {
  if (redis.status === 'ready') return

  try {
    await redis.connect()
  } catch (err) {
    console.error('Redis connect failed:', err)
  }
}
