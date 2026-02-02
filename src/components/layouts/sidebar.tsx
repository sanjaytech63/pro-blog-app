'use client'

import { dashboardNav } from '@/lib/constants/dashboard-nav'
import { NavItem } from './nav-item'
import { SidebarToggle } from './sidebar-toggle'
import { useSidebarStore } from '@/store/use-sidebar-store'
import { cn } from '@/lib/utils'
import { SidebarLogout } from './sidebar-logout'
import { Logo } from '../logo'

export function Sidebar() {
  const collapsed = useSidebarStore((s) => s.collapsed)
  return (
    <aside
      className={cn(
        'bg-background hidden flex-col border-r transition-all duration-300 lg:flex',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span className="truncate font-semibold">
            <Logo />
          </span>
        )}
        <SidebarToggle />
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex-1 space-y-1 px-2">
        {dashboardNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t p-2">
        <SidebarLogout />
      </div>
    </aside>
  )
}
