import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { env } from '@/src/config/env'
import { DecodedToken } from '@/src/types/jwt'
import { handleRouteError } from '@/src/utils/handleError'

export function verifyAuth(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken
    req.user = decoded
    return null
  } catch (err: unknown) {
    return handleRouteError(err)
  }
}
