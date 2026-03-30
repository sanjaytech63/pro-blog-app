'use client'

import { Loader } from 'lucide-react'

export const FullPageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-white text-gray-900 dark:bg-black dark:text-white">
    <div className="flex items-center gap-3">
      <Loader className="text-primary dark:text-primary h-8 w-8 animate-spin" />
      <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
        Loading…
      </span>
    </div>
  </div>
)
