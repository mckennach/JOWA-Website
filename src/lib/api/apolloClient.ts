import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import { cookies, draftMode } from 'next/headers'

export const { getClient } = registerApolloClient(async () => {
  const { isEnabled: preview } = await draftMode()
  let authHeader = ''
  const cookieStore = await cookies()
  if (preview) {
    const auth = cookieStore.get('wp_jwt')?.value
    if (auth) {
      authHeader = `Bearer ${auth}`
    }
  }
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
    }),
    headers: {
      'Content-Type': 'application/json',
      ...(authHeader && { Authorization: authHeader }),
    },
  })
})
