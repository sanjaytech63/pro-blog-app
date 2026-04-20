import { redis, ensureRedisConnection } from './redis'

export class Cache {
  private prefix = 'app:v1'

  private buildKey(key: string) {
    return `${this.prefix}:${key}`
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      await ensureRedisConnection()

      const fullKey = this.buildKey(key)
      const data = await redis.get(fullKey)

      if (data) {
        return JSON.parse(data)
      }

      return null
    } catch (error) {
      console.error('Cache GET error:', error)
      return null
    }
  }

  async set(key: string, value: unknown, ttlSeconds = 60): Promise<void> {
    try {
      await ensureRedisConnection()

      const fullKey = this.buildKey(key)

      await redis.set(fullKey, JSON.stringify(value), 'EX', ttlSeconds)
    } catch (error) {
      console.error('Cache SET error:', error)
    }
  }

  async del(key: string): Promise<void> {
    try {
      await ensureRedisConnection()

      await redis.del(this.buildKey(key))
    } catch (error) {
      console.error('Cache DEL error:', error)
    }
  }

  async delByPattern(pattern: string): Promise<void> {
    try {
      await ensureRedisConnection()

      const keys = await redis.keys(this.buildKey(pattern))

      if (keys.length) {
        await redis.del(keys)
      }
    } catch (error) {
      console.error('Cache PATTERN DEL error:', error)
    }
  }
}

export const cache = new Cache()
