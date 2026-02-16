'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import clsx from 'clsx'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { navItems } from './navbar.constants'
import { MobileDrawer } from './mobile-drawer'
import { UserMenu } from './user-menu'
import { useLogout } from '@/hooks/use-logout'
import { useAuthStore } from '@/store/auth.store'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { logout, isLoggingOut } = useLogout()

  return (
    <>
      <header className="bg-background/80 fixed top-0 left-0 z-40 w-full overflow-hidden border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16">
          {/* Left */}
          <Logo />

          {/* Center (Desktop only) */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'rounded-md px-3 py-2 text-sm font-medium transition',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <UserMenu
                user={user!}
                onLogout={logout}
                disabled={isLoggingOut}
              />
            ) : (
              <Link href="/login">
                <Button size="sm" className="cursor-pointer">
                  Sign in
                </Button>
              </Link>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setOpen(true)}
              className="hover:bg-muted rounded-md p-2 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
