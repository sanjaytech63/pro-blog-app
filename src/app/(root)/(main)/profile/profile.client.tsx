'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AuthUser } from '@/types/auth'
import { ProfileHeader } from './components/profile-header'
import { ProfileAvatar } from './components/profile-avatar'
import { ProfileForm } from './components/profile-form'

export function ProfileClient() {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<AuthUser | null>(['me'])

  if (!user) {
    return null // or skeleton
  }

  return (
    <div className="space-y-8">
      <ProfileHeader />

      <div className="bg-background rounded-xl border p-6">
        <div className="grid gap-8 md:grid-cols-[160px_1fr]">
          <ProfileAvatar user={user} />
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  )
}
