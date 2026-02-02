'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSidebarStore } from '@/store/use-sidebar-store'
import { cn } from '@/lib/utils'

interface NavItemProps {
  title: string
  href: string
  icon: LucideIcon
}

export function NavItem({ title, href, icon: Icon }: NavItemProps) {
  const pathname = usePathname()
  const collapsed = useSidebarStore((s) => s.collapsed)

  const active = pathname === href

  const content = (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-md px-4 py-2 text-sm transition-colors',
        active ? 'bg-muted font-medium' : 'hover:bg-muted',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span>{title}</span>}
    </Link>
  )

  if (!collapsed) return content

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  )
}
