import { NextRequest } from 'next/server'
import ApiError from '../utils/ApiError'

export function requireAdmin(req: NextRequest) {
  if (!req.user || req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin access required')
  }
  return null
}
