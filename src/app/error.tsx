'use client'

import { useEffect } from 'react'
import { Bug, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset?: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body className="bg-background text-foreground">
        <div className="relative flex min-h-screen items-center justify-center px-6">
          <div className="from-destructive/10 to-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent" />

          <div className="relative z-10 mx-auto max-w-md text-center">
            <div className="bg-destructive/10 text-destructive mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <Bug className="h-8 w-8" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Something went wrong
            </h1>

            <p className="text-muted-foreground mt-3 text-sm">
              An unexpected error occurred. Don’t worry — it’s not your fault.
            </p>

            {/* optional: show message only in dev */}
            {process.env.NODE_ENV === 'development' && (
              <pre className="bg-muted text-destructive mt-4 max-h-32 overflow-auto rounded-md p-3 text-left text-xs">
                {error.message}
              </pre>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {reset && (
                <Button onClick={reset}>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try again
                </Button>
              )}

              <Button asChild variant="outline">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
