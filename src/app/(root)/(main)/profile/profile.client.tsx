'use client'

import { ProfileHeader } from './components/profile-header'
import { ProfileForm } from './components/profile-form'
import { ProfileAvatar } from './components/profile-avatar'

export function ProfileClient() {
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
