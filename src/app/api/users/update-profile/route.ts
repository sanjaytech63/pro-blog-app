import { NextRequest } from 'next/server'
import { connectDB } from '@/src/libs/db'
import { updateProfileSchema } from '@/src/validators/user.schema'
import { userService } from '@/src/services/user.service'
import { ApiResponse } from '@/src/utils/ApiResponse'
import { catchAsync } from '@/src/utils/catchAsync'
import { verifyAuth } from '@/src/middlewares/auth.middleware'

export const PUT = catchAsync(async (req: NextRequest) => {
  const auth = verifyAuth(req)
  if (auth) return auth

  await connectDB()

  const body = updateProfileSchema.parse(await req.json())
  const userId = req.user!.id

  const updatedUser = await userService.updateProfile(userId, body)

  return ApiResponse.success(updatedUser, 'Profile updated successfully')
})
