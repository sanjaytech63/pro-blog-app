import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'
import { AccessTokenPayload } from '@/types/auth'
import { log } from 'console'

export function verifyAuth(req: NextRequest) {
  const token =
    req.cookies.get('access_token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '')

  log(token, 'token')

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = verifyAccessToken<AccessTokenPayload>(token)

    req.user = {
      id: decoded.id,
      role: decoded.role,
    }

    return null
  } catch {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
}
