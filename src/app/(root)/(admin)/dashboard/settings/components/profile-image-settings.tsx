'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { SettingsSection } from './settings-section'
import { useQueryClient } from '@tanstack/react-query'
import { AuthUser } from '@/types/auth'

export function ProfileImageSettings() {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<AuthUser | null>(['me'])

  if (!user) return null

  return (
    <SettingsSection
      title="Profile photo"
      description="This image will be shown on your profile and dashboard"
    >
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          {user.avatar && (
            <AvatarImage
              src={user.avatar}
              alt={user.fullName}
              referrerPolicy="no-referrer"
            />
          )}
          <AvatarFallback>
            {user.fullName?.charAt(0).toUpperCase() ?? 'U'}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <Button variant="outline" size="sm">
            Change photo
          </Button>

          <p className="text-muted-foreground text-xs">JPG, PNG up to 2MB</p>
        </div>
      </div>
    </SettingsSection>
  )
}
