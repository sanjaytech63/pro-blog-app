'use client'

import { dashboardService } from '@/app/(root)/(admin)/dashboard/components/services/dashboard.service'
import { useQuery } from '@tanstack/react-query'

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getDashboard,
    staleTime: 1000 * 60, // 1 min cache
  })
}
