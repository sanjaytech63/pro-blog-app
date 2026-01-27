import { connectDB } from '@/lib/db'
import { requireAdminUser } from '@/middlewares/guards'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { NextRequest } from 'next/server'

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const guard = requireAdminUser(req)
    if (guard) return guard

    await connectDB()

    const restored = await userService.restoreUser(params.id)
    return ApiResponse.success(restored, 'User restored')
  },
)
