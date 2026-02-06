'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AuthUser } from '@/types/auth'

export function ProfileForm({ user }: { user: AuthUser }) {
  return (
    <form className="space-y-6">
      {/* Full name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          defaultValue={user.fullName}
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>Email</Label>
        <Input disabled defaultValue={user.email} />
        <p className="text-muted-foreground text-xs">
          Email is managed by your login provider
        </p>
      </div>

      {/* Provider info */}
      <div className="bg-muted rounded-md px-4 py-3 text-sm">
        Logged in with <strong>{user.provider}</strong>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}
