import { Global, RootQueryToMenuItemConnection } from '@/gql/graphql'
import Footer from '@/src/components/footer'
import Navigation from '@/src/components/navigation'
import SkipToContent from '@/src/components/navigation/skip-to-content'
import { PreviewNotice } from '@/src/components/preview-notice/preview-notice'
import LoadingScreen from '@/src/components/templates/load-screen'
import { SessionProvider } from '@/src/context'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import {
  GLOBALS_QUERY,
  LOAD_SCREEN_QUERY,
  MENU_ITEMS_QUERY,
} from '@/src/lib/queries'
import { print } from 'graphql/language/printer'
import { cookies, draftMode } from 'next/headers'

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

async function getLoadScreenData() {
  const { global } = await fetchGraphQL<{
    global: Global
  }>(print(LOAD_SCREEN_QUERY), {
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
  const cookieStore = await cookies()
  const isAuth = cookieStore.get('user:auth')
  const isLoaded = cookieStore.get('animation-loaded')

  const { isEnabled } = await draftMode()
  const menuItems = await getData()
  const globalData = await getGlobalData()
  const loadScreenData = await getLoadScreenData()

  if (!isLoaded && isAuth) {
    ;<main>
      <LoadingScreen
        text={loadScreenData.globals?.loadScreenText}
        image={loadScreenData.globals?.loadScreenImage}
      />
    </main>
  }

  return (
    <SessionProvider>
      <SkipToContent />
      <Navigation menuItems={menuItems} />
      {isEnabled && <PreviewNotice />}
      {children}
      <Footer globalData={globalData} />
    </SessionProvider>
  )
}
