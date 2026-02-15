import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { newsletterService } from '@/services/newsletter.service'
import { requireAdminUser } from '@/middlewares/guards'
import { catchAsync } from '@/utils/catchAsync'
import { ApiResponse } from '@/utils/ApiResponse'

export const GET = catchAsync(async (req: NextRequest) => {
  const guard = requireAdminUser(req)
  if (guard) return guard

  await connectDB()

  const { searchParams } = new URL(req.url)

  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const limit = Math.min(
    100,
    Math.max(1, Number(searchParams.get('limit')) || 20),
  )
  const search = searchParams.get('search') || undefined

  const result = await newsletterService.getAll({
    page,
    limit,
    search,
  })

  return ApiResponse.success(result)
})
