'use client'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { SettingsSection } from './settings-section'
import { useThemeStore } from '@/store/theme.store'

export function PreferenceSettings() {
  const { theme, setTheme } = useThemeStore()

  return (
    <SettingsSection
      title="Preferences"
      description="Customize your experience"
    >
      <div className="max-w-md space-y-4">
        {/* Dark mode */}
        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">Dark mode</Label>
          <Switch
            id="darkMode"
            className="cursor-pointer"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>

        {/* Notifications (placeholder for later) */}
        <div className="flex items-center justify-between">
          <Label htmlFor="emails">Email notifications</Label>
          <Switch className="cursor-pointer" id="emails" disabled />
        </div>
      </div>
    </SettingsSection>
  )
}
