import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from '@/components/providers/client-providers'
import { ThemeProvider } from '@/hooks/theme-provider'
import { AuthGate } from '@/components/auth-gate'
import { AppShell } from '@/components/layouts/app-shell'
import { ScrollToTop } from '@/components/scroll-to-top'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AuthInitializer } from '@/components/auth-initializer'

export const metadata: Metadata = {
  metadataBase: new URL('https://pro-blog-app.vercel.app'),
  title: {
    default: 'BlogMint',
    template: '%s | BlogMint',
  },
  description:
    'BlogMint is a modern blogging platform for creators. Publish articles, engage with readers, and grow your audience.',
  keywords: [
    'blog',
    'blogging platform',
    'content management',
    'write blogs',
    'blog software',
    'creators',
    'BlogMint',
  ],
  openGraph: {
    title: 'BlogMint',
    description:
      'Modern platform for publishing blogs, engaging with readers, and growing an audience.',
    url: 'https://pro-blog-app.vercel.app',
    siteName: 'BlogMint',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogMint',
    description: 'Modern platform for publishing blogs and building audiences.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://pro-blog-app.vercel.app',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientProviders>
          <AuthGate>
            <AuthInitializer />
            <ThemeProvider>
              <AppShell>
                {children}
                <ScrollToTop />
              </AppShell>
            </ThemeProvider>
          </AuthGate>
        </ClientProviders>
        <SpeedInsights />
      </body>
    </html>
  )
}
