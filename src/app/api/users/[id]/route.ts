import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { verifyAuth } from '@/middlewares/auth.middleware'
import { requireAdmin } from '@/middlewares/requireAdmin'

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
