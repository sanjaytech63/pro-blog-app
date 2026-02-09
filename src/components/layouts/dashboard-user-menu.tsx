'use client'

import { LogOut, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AuthUser } from '@/types/auth'
import Link from 'next/link'

interface UserMenuProps {
  user: AuthUser
  onLogout: () => void
  disabled: boolean
}

export function DashBoardMenu({ user, onLogout, disabled }: UserMenuProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="h-10 w-10 rounded-full">
        <Button
          variant="ghost"
          className="hover:bg-muted focus-visible:ring-ring flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="h-8 w-8 cursor-pointer">
            {user?.avatar && (
              <AvatarImage
                src={user?.avatar}
                alt={user?.fullName}
                referrerPolicy="no-referrer"
              />
            )}

            <AvatarFallback>
              {user.fullName?.charAt(0).toUpperCase() ?? 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{user.fullName}</p>
          <p className="text-muted-foreground text-xs">{user.email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href={'/dashboard/settings'}
            className="flex items-center gap-2"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={disabled}
          onClick={onLogout}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
