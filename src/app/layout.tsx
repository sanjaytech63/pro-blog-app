import type { Metadata } from 'next'
import './globals.css'

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
      <body className="antialiased">{children}</body>
    </html>
  )
}
