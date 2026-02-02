import { Logo } from '../logo'
import { MobileSidebar } from './mobile-sidebar'
import { NotificationsMenu } from './notifications-menu'
import { UserMenu } from './user-menu'

export function Topbar() {
  return (
    <header className="bg-background flex h-16 items-center gap-3 border-b px-4">
      {/* Mobile sidebar trigger */}
      <MobileSidebar />

      {/* Page title (later dynamic via context) */}
      <div className="text-sm font-semibold md:text-base">
        <Logo />
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  )
}
