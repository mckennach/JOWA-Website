import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  createHttpLink,
  defaultDataIdFromObject,
} from '@apollo/client'
import { draftMode, cookies } from 'next/headers'
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'

export const { getClient } = registerApolloClient(() => {
  const { isEnabled: preview } = draftMode()
  let authHeader = ''
  if (preview) {
    const auth = cookies().get('wp_jwt')?.value
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

// const cache = new InMemoryCache({
//   dataIdFromObject(responseObject) {
//     if ('nodeId' in responseObject) {
//       return `${responseObject.nodeId}`
//     }

//     return defaultDataIdFromObject(responseObject)
//   },
//   possibleTypes: { Node: ['Todos'] }, // optional, but useful to specify supertype-subtype relationships
//   typePolicies: {
//     Query: {
//       fields: {
//         todosCollection: relayStylePagination(), // example of paginating a collection
//         node: {
//           read(_, { args, toReference }) {
//             const ref = toReference({
//               nodeId: args?.nodeId,
//             })

//             return ref
//           },
//         },
//       },
//     },
//   },
// })

// const httpLink = createHttpLink({
//   uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
// })

// const authLink = setContext(async (_, { headers }) => {
//   const { isEnabled: preview } = draftMode();
// 	let authHeader = "";
// 	if (preview) {
// 		const auth = cookies().get("wp_jwt")?.value;
// 		if (auth) {
// 			authHeader = `Bearer ${auth}`;
// 		}
// 	}

//   return {
//     headers: {
// 			"Content-Type": "application/json",
//       ...headers,
//       ...(authHeader && { Authorization: authHeader }),
//     },
//   }
// })

// const apolloClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache,
// })

// export default apolloClient
