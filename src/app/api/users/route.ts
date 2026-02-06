import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import { userService } from '@/services/user.service'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { requireAdminUser } from '@/middlewares/guards'

export const GET = catchAsync(async (req: NextRequest) => {
  const guard = requireAdminUser(req)
  if (guard) return guard

  await connectDB()

  const query = Object.fromEntries(req.nextUrl.searchParams)
  const users = await userService.list({
    page: Number(query.page),
    limit: Number(query.limit),
    search: query.search,
    includeDeleted: query.includeDeleted === 'true',
  })

  return ApiResponse.success(users, 'Users fetched')
})
