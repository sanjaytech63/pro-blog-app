'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsSection } from './settings-section'

export function ProfileSettings() {
  return (
    <SettingsSection
      title="Profile"
      description="Update your personal information"
    >
      <form className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>

        <div className="flex justify-end md:col-span-2">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </SettingsSection>
  )
}
