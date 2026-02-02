'use client'

import { LogOut } from 'lucide-react'
import { useSidebarStore } from '@/store/use-sidebar-store'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SidebarLogoutProps {
  onLogout?: () => void
}

export function SidebarLogout({ onLogout }: SidebarLogoutProps) {
  const collapsed = useSidebarStore((s) => s.collapsed)

  const handleLogout = () => {
    // replace with real logout logic
    onLogout?.()
    console.log('logout')
  }

  const content = (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="w-full cursor-pointer justify-start gap-3 px-3"
    >
      <LogOut className="h-4 w-4 shrink-0" />
      {!collapsed && <span>Logout</span>}
    </Button>
  )

  if (!collapsed) return content

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right">Logout</TooltipContent>
    </Tooltip>
  )
}
