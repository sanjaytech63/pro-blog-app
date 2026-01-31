'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'
import clsx from 'clsx'
import { useQueryClient } from '@tanstack/react-query'
import { AuthUser } from '@/types/auth'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { navItems } from './navbar.constants'
import { MobileDrawer } from './mobile-drawer'
import { authService } from '@/services/client/auth.service'
import { toast } from 'sonner'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const user = queryClient.getQueryData<AuthUser | null>(['me'])
  const isAuthenticated = !!user
  const isVerified = !!user?.isVerified

  const logout = async () => {
    try {
      const res = await authService.logout()
      toast.success(res.message)
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
          <Logo />

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

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isAuthenticated && isVerified ? (
              <Button
                size="sm"
                className="cursor-pointer"
                variant="outline"
                onClick={logout}
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
