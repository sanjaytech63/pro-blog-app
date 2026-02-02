import { ProfileSettings } from './components/profile-settings'
import { SecuritySettings } from './components/security-settings'
import { PreferenceSettings } from './components/preference-settings'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Sections */}
      <ProfileSettings />
      <SecuritySettings />
      <PreferenceSettings />
    </div>
  )
}
