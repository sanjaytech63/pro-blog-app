'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebarStore } from '@/store/use-sidebar-store'

export function SidebarToggle() {
  const collapsed = useSidebarStore((s) => s.collapsed)
  const toggle = useSidebarStore((s) => s.toggle)

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="cursor-pointer"
    >
      {collapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  )
}
