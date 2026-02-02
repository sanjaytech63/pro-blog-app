'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

const AUTH_MESSAGES: Record<string, string> = {
  success: 'Logged in successfully',
  verified: 'Email verified. Please login.',
  'reset-success': 'Password reset successful',
  'reset-sent': 'Reset email sent',
}

export function useAuthToast() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const auth = params.get('auth')
    if (!auth) return

    const msg = AUTH_MESSAGES[auth]
    if (msg) {
      toast.success(msg)
      router.replace(window.location.pathname)
    }
  }, [params, router])
}
