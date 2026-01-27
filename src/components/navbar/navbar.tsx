'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, User } from 'lucide-react'
import clsx from 'clsx'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { navItems } from './navbar.constants'
import { MobileDrawer } from './mobile-drawer'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { authService } from '@/services/client/auth.service'
import { queryClient } from '@/lib/queryClient'

export function Navbar() {
  const router = useRouter()
  const { isAuthenticated, isVerified } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const logout = async () => {
    try {
      await authService.logout()
      queryClient.removeQueries({ queryKey: ['me'] })
      router.replace('/login')
    } catch {
      toast.error('Logout failed')
    }
  }

  return (
    <>
      <header className="bg-background/80 fixed top-0 left-0 z-40 w-full border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Left */}
          <Logo />

          {/* Center (desktop) */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
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

          <div className="flex gap-2">
            {/* Right (desktop) */}
            <div className="flex items-center md:gap-6">
              <ThemeToggle />

              {isAuthenticated && isVerified ? (
                <Button
                  className="cursor-pointer"
                  onClick={logout}
                  size="sm"
                  variant="outline"
                >
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button className="cursor-pointer" size="sm">
                    Sign In
                  </Button>
                </Link>
              )}

              <button
                className="hover:bg-muted inline-flex items-center justify-center rounded-md p-2 md:hidden"
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              className="hover:bg-muted inline-flex items-center justify-center rounded-md md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
