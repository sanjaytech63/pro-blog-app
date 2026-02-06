'use client'

import { Button } from '@/components/ui/button'
import { SettingsSection } from './settings-section'

export function DangerZoneSettings() {
  const handleDeleteAccount = () => {
    // 🔴 connect API later
    console.log('Delete account')
  }

  return (
    <SettingsSection title="Danger zone">
      <div className="border-destructive/30 rounded-md border p-4">
        <h3 className="text-destructive text-sm font-semibold">
          Delete account
        </h3>

        <p className="text-muted-foreground mt-1 text-sm">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>

        <Button
          variant="destructive"
          size="sm"
          className="mt-4"
          onClick={handleDeleteAccount}
        >
          Delete account
        </Button>
      </div>
    </SettingsSection>
  )
}
