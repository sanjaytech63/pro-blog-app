import { NextRequest } from 'next/server'
import { connectDB } from '@/src/libs/db'
import { verifyAuth } from '@/src/middlewares/auth.middleware'
import { requireAdmin } from '@/src/middlewares/requireAdmin'
import { userService } from '@/src/services/user.service'
import { ApiResponse } from '@/src/utils/ApiResponse'
import { catchAsync } from '@/src/utils/catchAsync'

export const DELETE = catchAsync<'id'>(async (req: NextRequest, { params }) => {
  const auth = verifyAuth(req)
  if (auth) return auth

  const adminCheck = requireAdmin(req)
  if (adminCheck) return adminCheck

  await connectDB()

  const userId = params.id
  const adminId = req.user!.id

  const deletedUser = await userService.softDeleteUser(userId, adminId)

  return ApiResponse.success(deletedUser, 'User soft deleted')
})
