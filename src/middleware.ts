import { NextResponse } from 'next/server'
import { rateLimit } from '@/src/utils/rateLimit'
import { getIp } from '@/src/utils/getIp'

export function middleware(req: Request) {
  const res = NextResponse.next()

  // --- CORS SETUP ---
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  )
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // --- RATE LIMITING ONLY FOR /api ROUTES ---
  if (req.url.includes('/api/')) {
    // Extract client IP
    const ip = getIp(req)
    const allowed = rateLimit(ip, 10, 60_000) // 10 req/min

    if (!allowed) {
      return NextResponse.json(
        { message: 'Too many requests' },
        { status: 429 },
      )
    }
  }

  return res
}

export const config = {
  matcher: '/api/:path*',
}
