import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { verifyAuth } from '@/middlewares/auth.middleware'
import { requireAdmin } from '@/middlewares/requireAdmin'

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const auth = await verifyAuth(req)
    if (auth) return auth

    const adminCheck = await requireAdmin(req)
    if (adminCheck) return adminCheck

    await connectDB()

    const { id: userId } = await params
    const adminId = req.user!.id

    const deletedUser = await userService.softDeleteUser(userId, adminId)

    return ApiResponse.success(deletedUser, 'User soft deleted')
  },
)
