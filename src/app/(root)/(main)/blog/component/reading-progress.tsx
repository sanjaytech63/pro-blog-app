'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const scrolled = (scrollTop / height) * 100
      setProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-muted fixed top-0 left-0 z-50 h-1 w-full">
      <div
        className="bg-primary h-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
