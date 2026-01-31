import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { requireAdminUser } from '@/middlewares/guards'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const guard = await requireAdminUser(req)
    if (guard) return guard

    await connectDB()

    const { id } = await params

    const restored = await userService.restoreUser(id)

    return ApiResponse.success(restored, 'User restored')
  },
)
