import { NextRequest } from 'next/server'
import { connectDB } from '@/src/libs/db'
import { userService } from '@/src/services/user.service'
import { ApiResponse } from '@/src/utils/ApiResponse'
import { catchAsync } from '@/src/utils/catchAsync'
import { verifyAuth } from '@/src/middlewares/auth.middleware'

export const GET = catchAsync(async (req: NextRequest) => {
  const auth = verifyAuth(req)
  if (auth) return auth

  await connectDB()

  const userId = req.user!.id
  const user = await userService.getProfile(userId)

  return ApiResponse.success(user, 'User profile fetched')
})
