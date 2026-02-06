import { ProfileImageSettings } from './components/profile-image-settings'
import { ProfileSettings } from './components/profile-settings'
import { SecuritySettings } from './components/security-settings'
import { PreferenceSettings } from './components/preference-settings'
import { DangerZoneSettings } from './components/danger-zone-settings'
import { SettingsHeader } from './components/settings-header'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <SettingsHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />
      <ProfileImageSettings />
      <ProfileSettings />
      <SecuritySettings />
      <PreferenceSettings />
      <DangerZoneSettings />
    </div>
  )
}
