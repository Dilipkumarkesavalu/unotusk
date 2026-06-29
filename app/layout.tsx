import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { LenisProvider } from '@/lib/lenis'
import { ScrollInit } from '@/components/ScrollInit'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const youngSerif = localFont({
  src: '../public/fonts/YoungSerif-Regular.ttf',
  variable: '--font-young-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

export const metadata: Metadata = {
  title: 'UNOTUSK — The Project Intelligence Engine',
  description:
    'Your project already knows. UNOTUSK makes it visible. Every decision your team ever made, reconstructed into intelligence AI can actually use.',
  metadataBase: new URL('https://unotusk.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'UNOTUSK — The Project Intelligence Engine',
    description: 'Your project already knows. UNOTUSK makes it visible.',
    siteName: 'UNOTUSK',
    url: 'https://unotusk.com',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'UNOTUSK — The Project Intelligence Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNOTUSK — The Project Intelligence Engine',
    description: 'Your project already knows. UNOTUSK makes it visible.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${youngSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'UNOTUSK',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              url: 'https://unotusk.com',
              description:
                'Your project already knows. UNOTUSK makes it visible. Every decision your team ever made, reconstructed into intelligence AI can actually use.',
              publisher: {
                '@type': 'Organization',
                name: 'UNOTUSK',
                url: 'https://unotusk.com',
                logo: 'https://unotusk.com/icon.png',
              },
            }),
          }}
        />
        <ScrollInit />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
