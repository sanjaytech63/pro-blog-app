'use client'

import { Loader } from 'lucide-react'

export const FullPageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-6 py-4 shadow-lg backdrop-blur-md">
      <Loader className="h-5 w-5 animate-spin text-white" />
      <span className="text-sm font-medium text-white">Loading…</span>
    </div>
  </div>
)
