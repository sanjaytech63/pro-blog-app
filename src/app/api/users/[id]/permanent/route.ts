import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { requireAdminUser } from '@/middlewares/guards'

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const guard = await requireAdminUser(req)
    if (guard) return guard

    await connectDB()

    const { id } = await params

    const deleted = await userService.softDeleteUser(id, req.user!.id)

    return ApiResponse.success(deleted, 'User soft deleted')
  },
)
