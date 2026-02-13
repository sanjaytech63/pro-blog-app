import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'
import { AccessTokenPayload } from '@/types/auth'
import { logRedirect } from '@/lib/logger'

const allowedOrigins = [
  'http://localhost:3000',
  'https://pro-blog-app.vercel.app',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const origin = request.headers.get('origin') ?? ''
  const token = request.cookies.get('access_token')?.value

  const response = NextResponse.next()

  /* =========================
     CORS (FOR API ROUTES)
  ========================= */
  if (pathname.startsWith('/api')) {
    if (allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }

    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,DELETE,OPTIONS',
    )

    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    )

    response.headers.set('Access-Control-Allow-Credentials', 'true')

    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: response.headers })
    }

    return response
  }

  /* =========================
     AUTH LOGIC
  ========================= */

  let payload: AccessTokenPayload | null = null

  if (token) {
    try {
      payload = verifyAccessToken<AccessTokenPayload>(token)
    } catch {
      payload = null
    }
  }

  if (pathname.startsWith('/dashboard')) {
    if (!payload) {
      logRedirect(pathname, '/login', 'no_token')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (payload.role !== 'admin') {
      logRedirect(pathname, '/unauthorized', 'not_admin')
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  if (payload && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(
      new URL(payload.role === 'admin' ? '/dashboard' : '/', request.url),
    )
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/api/:path*', // 🔥 important
  ],
}
