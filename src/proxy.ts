import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/utils/rateLimit'
import { getIp } from '@/utils/getIp'
import { verifyAccessToken } from '@/lib/jwt'
import { AccessTokenPayload } from '@/types/auth'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  /* =========================
     API: RATE LIMIT + CORS
  ========================= */
  if (pathname.startsWith('/api')) {
    const ip = getIp(request)
    const allowed = rateLimit(ip, 10, 60_000)

    if (!allowed) {
      return NextResponse.json(
        { message: 'Too many requests' },
        { status: 429 },
      )
    }

    const res = NextResponse.next()
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    )
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    )
    return res
  }

  /* =========================
     AUTH CHECK
  ========================= */
  const token = request.cookies.get('access_token')?.value

  let payload: AccessTokenPayload | null = null

  if (token) {
    try {
      payload = verifyAccessToken<AccessTokenPayload>(token)
    } catch {
      payload = null
    }
  }

  /* =========================
     PROTECT DASHBOARD
  ========================= */
  if (!payload && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  /* =========================
     ROLE-BASED REDIRECT
  ========================= */
  if (payload && pathname === '/login') {
    if (payload.role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

/* =========================
   MATCHER
========================= */
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/login', '/register'],
}
