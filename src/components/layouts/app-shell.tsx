'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isDashboard = pathname.startsWith('/dashboard')

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </>
  )
}
