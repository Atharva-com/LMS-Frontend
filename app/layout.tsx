"use client"

import './globals.css'
import { Poppins } from 'next/font/google'
import { Josefin_Sans } from 'next/font/google'
import { ThemeProvider } from './utils/theme-provider'
import { Toaster } from 'react-hot-toast'
import { Providers } from './Provider'
import { SessionProvider } from 'next-auth/react' 
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { SyncLoader } from 'react-spinners'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect } from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-Poppins"
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-Josefin"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} ${josefin.variable} bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers>
          <SessionProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
            <SpeedInsights />
            <Analytics />
            <Toaster position='top-center' reverseOrder={false} />
          </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}

