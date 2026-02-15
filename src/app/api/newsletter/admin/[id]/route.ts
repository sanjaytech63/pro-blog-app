import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { newsletterService } from '@/services/newsletter.service'
import { requireAdminUser } from '@/middlewares/guards'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'

export const DELETE = catchAsync(
  async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
    const guard = requireAdminUser(req)
    if (guard) return guard

    await connectDB()

    const { id } = await context.params

    const result = await newsletterService.deleteSubscriber(id)

    return ApiResponse.success(result, 'Delete successfully')
  },
)
