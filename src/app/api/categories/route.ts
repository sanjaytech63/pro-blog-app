import { connectDB } from '@/lib/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { postService } from '@/services/post.service'

export const GET = catchAsync(async (req) => {
  await connectDB()

  const { searchParams } = new URL(req.url)

  const rawStatus = searchParams.get('status')
  const status =
    rawStatus === 'DRAFT' || rawStatus === 'PUBLISHED' ? rawStatus : 'PUBLISHED'

  const categories = await postService.getCategoriesWithCount(status)

  return ApiResponse.success({
    categories,
  })
})
