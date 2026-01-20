import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/src/utils/rateLimit'
import { getIp } from '@/src/utils/getIp'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // --- CORS ---
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  )

  // --- RATE LIMITING ---
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = getIp(request)
    const allowed = rateLimit(ip, 10, 60_000) // 10 req/min

    if (!allowed) {
      return NextResponse.json(
        { message: 'Too many requests' },
        { status: 429 },
      )
    }
  }

  return response
}
