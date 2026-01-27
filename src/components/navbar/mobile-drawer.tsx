'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { navItems } from './navbar.constants'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

type Props = {
  open: boolean
  onClose: () => void
}

export function MobileDrawer({ open, onClose }: Props) {
  const pathname = usePathname()

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 transition-all',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div
        className={clsx(
          'bg-background absolute top-0 left-0 h-full w-full max-w-sm shadow-xl transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <Logo />
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-2 p-4">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer actions */}
        <div className="fixed bottom-0 mt-auto flex w-full items-center gap-3 p-4">
          <Button className="flex-1">Login</Button>
        </div>
      </div>
    </div>
  )
}
