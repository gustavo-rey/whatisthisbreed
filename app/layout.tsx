import type { Metadata, Viewport } from 'next'
import { Alegreya_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import logoIcon from '@/assets/logo-icon.png'
import { I18nProvider } from '@/lib/i18n'
import './globals.css'

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-alegreya",
  display: "swap",
})
export const metadata: Metadata = {
  title: 'WhatIsThisBreed? | Identify Dog Breeds with AI',
  description: 'Discover your dog\'s breed instantly using AI-powered image recognition. Point your camera, snap a photo, and get accurate breed identification.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: logoIcon.src,
        type: 'image/png',
      },
    ],
    shortcut: logoIcon.src,
    apple: logoIcon.src,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FF5000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${alegreyaSans.variable} font-sans antialiased`}>
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
