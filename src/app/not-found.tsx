'use client'

import Link from 'next/link'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center px-6">
      {/* subtle background glow */}
      <div className="from-primary/10 to-accent/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent" />

      <div className="relative z-10 mx-auto max-w-md text-center">
        <div className="bg-destructive/10 text-destructive mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>

        <p className="text-muted-foreground mt-3 text-sm">
          Sorry, the page you’re looking for doesn’t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>

          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  )
}
