'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsSection } from './settings-section'

export function SecuritySettings() {
  return (
    <SettingsSection
      title="Security"
      description="Manage your password and account security"
    >
      <form className="max-w-md space-y-6">
        {/* Current password */}
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current password</Label>
          <Input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
          />
        </div>

        {/* New password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input id="newPassword" type="password" autoComplete="new-password" />
          <p className="text-muted-foreground text-xs">
            Must be at least 8 characters.
          </p>
        </div>

        {/* Confirm password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="submit">Update password</Button>
        </div>
      </form>
    </SettingsSection>
  )
}
