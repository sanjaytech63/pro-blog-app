'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsSection } from './settings-section'

export function SecuritySettings() {
  return (
    <SettingsSection
      title="Security"
      description="Manage your password and security preferences"
    >
      <form className="max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current password</Label>
          <Input id="currentPassword" type="password" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input id="newPassword" type="password" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Update password</Button>
        </div>
      </form>
    </SettingsSection>
  )
}
