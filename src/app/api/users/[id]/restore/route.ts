import { connectDB } from '@/src/libs/db'
import { verifyAuth } from '@/src/middlewares/auth.middleware'
import { requireAdmin } from '@/src/middlewares/requireAdmin'
import { userService } from '@/src/services/user.service'
import { ApiResponse } from '@/src/utils/ApiResponse'
import { catchAsync } from '@/src/utils/catchAsync'
import { NextRequest } from 'next/server'

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const auth = verifyAuth(req)
    if (auth) return auth

    const adminCheck = requireAdmin(req)
    if (adminCheck) return adminCheck

    await connectDB()

    const restored = await userService.restoreUser(params.id)

    return ApiResponse.success(restored, 'User restored successfully')
  },
)
