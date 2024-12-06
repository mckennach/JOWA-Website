import { Global, RootQueryToMenuItemConnection } from '@/gql/graphql'
import Navigation from '@/src/components/navigation'
import { PreviewNotice } from '@/src/components/preview-notice/preview-notice'
import {
	ApolloWrapper,
	GsapProvider,
	ScrollProvider,
	ThemeProvider,
} from '@/src/context'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { GLOBALS_QUERY, MENU_ITEMS_QUERY } from '@/src/lib/queries'
import '@/styles/globals.min.css'
import { print } from 'graphql/language/printer'
import { CookiesProvider } from 'next-client-cookies/server'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import Footer from '../components/footer'
import SkipToContent from '../components/navigation/skip-to-content'
import { cn } from '../lib/utils'

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

async function getGlobalData() {
  const { global } = await fetchGraphQL<{
    global: Global
  }>(print(GLOBALS_QUERY), {
    id: '357',
  })

  if (global === null) {
    throw new Error('Failed to fetch data')
  }

  return global
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = draftMode()
  const menuItems = await getData()
  const globalData = await getGlobalData()

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
                  {isEnabled && <PreviewNotice />}
                  <SkipToContent />
                  <Suspense>
                    <Navigation menuItems={menuItems} />
                  </Suspense>
                  <main className="max-w-full overflow-hidden">{children}</main>
                  <Footer globalData={globalData} />
                </ThemeProvider>
              </ApolloWrapper>
            </ScrollProvider>
          </GsapProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}
