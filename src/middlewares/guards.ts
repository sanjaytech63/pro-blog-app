import { NextRequest } from 'next/server'
import { verifyAuth } from './auth.middleware'
import { requireAdmin } from './requireAdmin'

export function requireUser(req: NextRequest) {
  const authError = verifyAuth(req)
  if (authError) return authError
}

export function requireAdminUser(req: NextRequest) {
  const authError = verifyAuth(req)
  if (authError) return authError

  const adminError = requireAdmin(req)
  if (adminError) return adminError
}
