const ipMap = new Map<string, { count: number; last: number }>()

export function rateLimit(ip: string, limit = 5, windowMs = 60000) {
  const now = Date.now()
  const data = ipMap.get(ip) || { count: 0, last: now }

  if (now - data.last > windowMs) {
    data.count = 0
    data.last = now
  }

  data.count++
  ipMap.set(ip, data)

  return data.count <= limit
}
