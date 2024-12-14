import {
	GsapProvider,
	ScrollProvider,
	ThemeProvider
} from '@/src/context'
import '@/styles/globals.min.css'
import { CookiesProvider } from 'next-client-cookies/server'
import localFont from 'next/font/local'
import { cn } from '../lib/utils'
import { SpeedInsights } from "@vercel/speed-insights/next"

const maisonNeue = localFont({
  src: '../../public/fonts/MaisonNeue-Book.woff2',
  display: 'swap',
  variable: '--font-maison-neue',
})

const maisonNeueExt = localFont({
  src: '../../public/fonts/MaisonNeueExt-Book.woff2',
  display: 'swap',
  variable: '--font-maison-neue-ext',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          maisonNeueExt.className,
          maisonNeueExt.variable,
          maisonNeue.variable
        )}
      >
        <CookiesProvider>
          <GsapProvider>
            <ScrollProvider>
                <ThemeProvider>{children}</ThemeProvider>
            </ScrollProvider>
          </GsapProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}
