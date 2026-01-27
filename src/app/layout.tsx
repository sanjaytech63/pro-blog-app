import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from '@/components/providers/ClientProviders'
import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'
import { ThemeProvider } from '@/hooks/ThemeProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://blogmint.com'),
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
    url: 'https://blogmint.com',
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
    canonical: 'https://blogmint.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientProviders>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  )
}
