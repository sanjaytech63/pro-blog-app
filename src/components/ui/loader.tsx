'use client'

import { Loader as LoderIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  className?: string
  label?: string
}

export function Loader({ className, label }: LoaderProps) {
  return (
    <div
      className={cn('flex items-center gap-2', className)}
      role="status"
      aria-live="polite"
    >
      <LoderIcon className="h-4 w-4 animate-spin" />
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  )
}
