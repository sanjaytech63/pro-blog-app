import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'
import { AccessTokenPayload } from '@/types/auth'
import { logRedirect } from '@/lib/logger'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
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
     DASHBOARD ACCESS
  ========================= */
  if (pathname.startsWith('/dashboard')) {
    if (!payload) {
      logRedirect(pathname, '/login', 'no_token')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (payload.role !== 'admin') {
      logRedirect(pathname, '/unauthorized', 'not_admin')
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    if (payload.role === 'admin' && !pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // if (payload.role === 'user' && !pathname.startsWith('/dashboard')) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }
  }

  /* =========================
     AUTH PAGES
  ========================= */
  if (payload && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(
      new URL(payload.role === 'admin' ? '/dashboard' : '/', request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
