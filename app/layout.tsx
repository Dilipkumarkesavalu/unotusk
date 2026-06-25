import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { LenisProvider } from '@/lib/lenis'
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
  title: 'UNOTUSK — The missing memory layer for AI.',
  description:
    'UNOTUSK gives AI the one thing it’s missing — your project’s memory. Every decision your team ever made. Every spec written after that reflects it.',
  metadataBase: new URL('https://unotusk.com'),
  openGraph: {
    title: 'UNOTUSK — The missing memory layer for AI.',
    description:
      'UNOTUSK gives AI the one thing it’s missing — your project’s memory.',
    siteName: 'UNOTUSK',
    locale: 'en_US',
    type: 'website',
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
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
