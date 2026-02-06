'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminUserService } from '@/services/client/admin-user.service'
import { toast } from 'sonner'

export function useAdminUserActions() {
  const queryClient = useQueryClient()

  const restoreUser = useMutation({
    mutationFn: (userId: string) => adminUserService.restore(userId),
    onSuccess: (res) => {
      toast.success(res.message || 'The user has been successfully restored.')
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Restore failed')
    },
  })

  const permanentDeleteUser = useMutation({
    mutationFn: (userId: string) => adminUserService.permanentDelete(userId),
    onSuccess: (res) => {
      toast.success(res.message || 'This action cannot be undone.')
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
    onError: (error: Error) => {
      toast.success(error.message || 'Delete failed')
    },
  })

  return {
    restoreUser,
    permanentDeleteUser,
  }
}
