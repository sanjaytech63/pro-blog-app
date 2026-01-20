import { NextRequest } from 'next/server'
import { connectDB } from '@/src/libs/db'
import { ApiResponse } from '@/src/utils/ApiResponse'
import { catchAsync } from '@/src/utils/catchAsync'
import { resetPasswordSchema } from '@/src/validators/auth.schema'
import { authService } from '@/src/services/auth.service'

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB()
  const { token, password } = resetPasswordSchema.parse(await req.json())
  await authService.resetPassword(token, password)
  return ApiResponse.success(null, 'Password reset successful')
})
