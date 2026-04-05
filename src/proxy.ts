import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'
import type { AccessTokenPayload } from '@/types/auth'
const allowedOrigins = [
  'http://localhost:3000',
  'https://pro-blog-app.vercel.app',
]

/**
 * PUBLIC ROUTES
 * These routes are accessible without authentication
 */
const PUBLIC_ROUTES = ['/', '/login', '/register']

/**
 * ADMIN ROUTES
 * Any route starting with this requires admin role
 */
const ADMIN_PREFIX = '/dashboard'

export function proxy(request: NextRequest) {
  const origin = request.headers.get('origin') || ''

  const isAllowed = allowedOrigins.includes(origin)

  const res = NextResponse.next()

  if (isAllowed) {
    res.headers.set('Access-Control-Allow-Origin', origin)
  }

  res.headers.set('Access-Control-Allow-Credentials', 'true')
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  )
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: res.headers })
  }

  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value

  let payload: AccessTokenPayload | null = null

  // =============================
  // VERIFY TOKEN
  // =============================
  if (token) {
    try {
      payload = verifyAccessToken<AccessTokenPayload>(token)
    } catch {
      payload = null
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX)

  // =============================
  // 1️⃣ NOT AUTHENTICATED
  // =============================
  if (!payload && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // =============================
  // 2️⃣ AUTH PAGES (Already Logged In)
  // =============================
  if (payload && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(
      new URL(payload.role === 'admin' ? '/dashboard' : '/', request.url),
    )
  }

  // =============================
  // 3️⃣ ADMIN ACCESS CONTROL
  // =============================
  if (payload && isAdminRoute && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // =============================
  // 4️⃣ ALLOW REQUEST
  // =============================
  return NextResponse.next()
}

/**
 * MATCHER
 * Protect everything except:
 * - Next.js internals
 * - Static files
 * - API routes (protect separately)
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|images|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico)).*)',
  ],
}
