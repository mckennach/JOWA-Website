'use client'

import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client'

import {
  ApolloClient as NextSSRApolloClient,
  ApolloNextAppProvider,
  SSRMultipartLink,
  InMemoryCache as NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support'

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
