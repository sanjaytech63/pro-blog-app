import { connectDB } from '@/lib/db'
import { ApiResponse } from '@/utils/ApiResponse'
import { catchAsync } from '@/utils/catchAsync'
import { requireAdminUser } from '@/middlewares/guards'
import { dashboardService } from '@/services/dashboard.service'

export const GET = catchAsync(async (req) => {
  await connectDB()

  /* ------------------ AUTH GUARD ------------------ */
  const guard = await requireAdminUser(req)
  if (guard) return guard

  /* ------------------ SERVICE ------------------ */
  const data = await dashboardService.getDashboard()

  /* ------------------ RESPONSE ------------------ */
  return ApiResponse.success(data, 'Dashboard fetched successfully')
})
