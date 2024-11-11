import { draftMode } from 'next/headers'
import localFont from 'next/font/local'
import {
  GsapProvider,
  ScrollProvider,
  ApolloWrapper,
  ThemeProvider,
} from '@/src/context'
import '@/styles/globals.min.css'
import Loading from '../components/loading'
import { CookiesProvider } from 'next-client-cookies/server'
import Navigation from '@/src/components/navigation'
import { PreviewNotice } from '@/src/components/preview-notice/preview-notice'
import Footer from '../components/footer'
import { cn } from '../lib/utils'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { MENU_ITEMS_QUERY } from '@/src/lib/queries'
import { RootQueryToMenuItemConnection } from '@/gql/graphql'
import { print } from 'graphql/language/printer'
import SkipToContent from '../components/navigation/skip-to-content'

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

async function getData() {
  const { menuItems } = await fetchGraphQL<{
    menuItems: RootQueryToMenuItemConnection
  }>(print(MENU_ITEMS_QUERY), {
    location: 'PRIMARY',
  })

  if (menuItems === null) {
    throw new Error('Failed to fetch data')
  }

  return menuItems
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = draftMode()
  const menuItems = await getData()
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
              <ApolloWrapper>
                <ThemeProvider>
                  <Loading />
                  {isEnabled && <PreviewNotice />}
                  <SkipToContent />
                  <Navigation menuItems={menuItems} />
                  <main className="">{children}</main>
                  <Footer />
                </ThemeProvider>
              </ApolloWrapper>
            </ScrollProvider>
          </GsapProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}
