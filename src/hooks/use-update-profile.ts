import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/client/auth.service'
import { toast } from 'sonner'
import { AuthUser } from '@/types/auth'

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AuthUser) => authService.updateProfile(data),

    onSuccess: (res) => {
      queryClient.setQueryData(['me'], res.data)
      toast.success('Profile updated')
    },

    onError: () => {
      toast.error('Failed to update profile')
    },
  })
}
