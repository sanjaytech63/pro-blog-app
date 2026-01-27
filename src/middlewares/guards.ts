import { NextRequest } from 'next/server'
import { verifyAuth } from './auth.middleware'
import { requireAdmin } from './requireAdmin'

export function requireUser(req: NextRequest) {
  const auth = verifyAuth(req)
  if (auth) return auth
}

export function requireAdminUser(req: NextRequest) {
  const auth = verifyAuth(req)
  if (auth) return auth

  const adminCheck = requireAdmin(req)
  if (adminCheck) return adminCheck
}
