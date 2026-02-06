import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AuthUser } from '@/types/auth'

export function ProfileAvatar({ user }: { user: AuthUser }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <Avatar className="h-24 w-24">
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

      <Button variant="outline" size="sm" disabled>
        Change photo
      </Button>

      <p className="text-muted-foreground text-xs">
        Profile photo syncs from your login provider
      </p>
    </div>
  )
}
