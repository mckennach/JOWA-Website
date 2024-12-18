import { Global, RootQueryToMenuItemConnection } from '@/gql/graphql'
import Footer from '@/src/components/footer'
import Navigation from '@/src/components/navigation'
import SkipToContent from '@/src/components/navigation/skip-to-content'
import { PreviewNotice } from '@/src/components/preview-notice/preview-notice'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { GLOBALS_QUERY, MENU_ITEMS_QUERY } from '@/src/lib/queries'
import { print } from 'graphql/language/printer'
import { cookies, draftMode } from 'next/headers'
import { Fragment, Suspense } from 'react'

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
  const cookieStore = await cookies()
  const isAuth = cookieStore.get('user:auth')

  const { isEnabled } = draftMode()
  const menuItems = await getData()
  const globalData = await getGlobalData();

  return (
    <Fragment>
      {isEnabled && <PreviewNotice />}
      <SkipToContent />
      <Suspense>{(isAuth || globalData.globals?.passwordEnabled === false) && <Navigation menuItems={menuItems} />}</Suspense>
      <main className="max-w-full overflow-hidden">{children}</main>
      {(isAuth || globalData.globals?.passwordEnabled === false)  && <Footer globalData={globalData} />}
    </Fragment>
  )
}
