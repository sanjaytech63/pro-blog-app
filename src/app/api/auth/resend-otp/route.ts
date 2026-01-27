import { authService } from '@/services/auth.service'
import { connectDB } from '@/lib/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'

export const POST = catchAsync(async () => {
  await connectDB()

  await authService.resendVerificationOtp()

  return ApiResponse.success(null, 'OTP resent successfully')
})
