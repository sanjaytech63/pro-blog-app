import { setAuthCookies } from '@/lib/auth-cookies'
import { authService } from '@/services/auth.service'
import ApiError from '@/utils/ApiError'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'

export const POST = catchAsync(async (req) => {
  const refreshToken = req.cookies.get('refresh_token')?.value

  if (!refreshToken) throw new ApiError(401, 'Refresh token missing')

  const tokens = await authService.refresh(refreshToken)

  await setAuthCookies(tokens.accessToken, tokens.refreshToken)

  return ApiResponse.success(null, 'Token refreshed')
})
