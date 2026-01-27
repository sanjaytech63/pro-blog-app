import { NextRequest } from 'next/server'
import { clearAuthCookies } from '@/lib/auth-cookies'
import { authService } from '@/services/auth.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { verifyAuth } from '@/middlewares/auth.middleware'

export const POST = catchAsync(async (req: NextRequest) => {
  const auth = verifyAuth(req)
  if (auth) return auth

  const userId = req.user!.id

  await authService.logout(userId)
  await clearAuthCookies()

  return ApiResponse.success(null, 'Logged out')
})
