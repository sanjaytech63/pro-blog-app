'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AuthUser } from '@/types/auth'
import { ProfileHeader } from './components/profile-header'
import { ProfileForm } from './components/profile-form'
import { ProfileAvatar } from './components/profile-avatar'
import { EmptyState } from '@/components/common/empty-state'

export function ProfileClient() {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<AuthUser | null>(['me'])

  if (!user) <EmptyState />

  return (
    <div className="space-y-8">
      <ProfileHeader />
      <div className="bg-background rounded-xl border p-6">
        <div className="">
          <ProfileAvatar />
          <div className="pt-10">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  )
}
