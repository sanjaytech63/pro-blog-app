import { connectDB } from '@/lib/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { postService } from '@/services/post.service'

export const GET = catchAsync(async (req) => {
  await connectDB()

  const { searchParams } = new URL(req.url)

  const posts = await postService.list({
    page: Number(searchParams.get('page')),
    limit: Number(searchParams.get('limit')),
    search: searchParams.get('search') || undefined,
    status: searchParams.get('status') as 'DRAFT' | 'PUBLISHED',
  })

  return ApiResponse.success(posts)
})
