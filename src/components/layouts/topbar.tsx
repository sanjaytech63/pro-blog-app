'use client'

import { Logo } from '../logo'
import { NotificationsMenu } from './notifications-menu'
import { DashBoardMenu } from './dashboard-user-menu'
import { MobileSidebar } from './mobile-sidebar'
import { useLogout } from '@/hooks/use-logout'
import { ThemeToggle } from '../theme-toggle'
import { useAuthStore } from '@/store/auth.store'

export function Topbar() {
  const user = useAuthStore((s) => s.user)
  const { logout, isLoggingOut } = useLogout()

  return (
    <header className="bg-background flex h-16 items-center gap-2 border-b px-4">
      <div className="text-sm font-semibold md:text-base">
        <Logo />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />

        <NotificationsMenu />

        {user && (
          <DashBoardMenu
            user={user}
            onLogout={logout}
            disabled={isLoggingOut}
          />
        )}
      </div>
      <MobileSidebar />
    </header>
  )
}
