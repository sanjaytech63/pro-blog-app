import { connectDB } from '@/lib/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { createPostSchema } from '@/validators/post.schema'
import { postService } from '@/services/post.service'
import { requireAdminUser } from '@/middlewares/guards'

export const POST = catchAsync(async (req) => {
  await connectDB()

  const guard = await requireAdminUser(req)
  if (guard) return guard

  const dto = createPostSchema.parse(await req.json())

  const post = await postService.create(req.user!.id, dto)

  return ApiResponse.success(post, 'Post created successfully')
})
