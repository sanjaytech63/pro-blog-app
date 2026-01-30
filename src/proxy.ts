import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'
import { AccessTokenPayload } from '@/types/auth'
import { rateLimit } from '@/utils/rateLimit'
import { getIp } from '@/utils/getIp'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  /* =========================
     SKIP STATIC FILES
  ========================= */
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next()
  }

  /* =========================
     API RATE LIMIT (SAFE)
  ========================= */
  if (pathname.startsWith('/api')) {
    // 🚫 DO NOT rate-limit auth identity checks
    if (
      pathname.startsWith('/api/users/me') ||
      pathname.startsWith('/api/auth/login') ||
      pathname.startsWith('/api/auth/logout')
    ) {
      return NextResponse.next()
    }

    const ip = getIp(request)
    const allowed = rateLimit(ip, 30, 60_000)

    if (!allowed) {
      return NextResponse.json(
        { message: 'Too many requests' },
        { status: 429 },
      )
    }

    return NextResponse.next()
  }

  /* =========================
     PAGE AUTH (TOKEN ONLY)
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
     REDIRECT AUTHED USERS
  ========================= */
  if (payload && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

/* =========================
   MATCHER
========================= */
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/login', '/register'],
}
