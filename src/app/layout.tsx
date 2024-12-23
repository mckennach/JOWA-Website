import { GsapProvider, ScrollProvider, ThemeProvider, ApolloWrapper } from '@/src/context'
import '@/styles/globals.min.css'
import { CookiesProvider } from 'next-client-cookies/server'
import localFont from 'next/font/local'
import { cn } from '../lib/utils'
export const runtime = 'edge';

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
						<ApolloWrapper>
							<ScrollProvider>
								<ThemeProvider>{children}</ThemeProvider>
							</ScrollProvider>
						</ApolloWrapper>
          </GsapProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}
