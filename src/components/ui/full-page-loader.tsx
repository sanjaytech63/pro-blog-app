'use client'

import { Loader } from 'lucide-react'

export const FullPageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="flex items-center gap-3">
      <Loader className="text-primary h-5 w-5 animate-spin" />
      <span className="text-muted-foreground text-sm font-medium">
        Loading…
      </span>
    </div>
  </div>
)
