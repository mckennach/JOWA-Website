import { print } from 'graphql/language/printer'
import { ContentNode, Page } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { PAGE_QUERY } from '@/lib/queries'
import Blocks from '../../blocks'
import HomePage from '../home'

export interface TemplateProps {
  node: ContentNode
}

export default async function PageTemplate({ node }: TemplateProps) {
  console.log(node)
  const { page } = await fetchGraphQL<{ page: Page }>(print(PAGE_QUERY), {
    id: node.databaseId,
  })

  switch (node?.uri) {
    case '/':
      return <HomePage node={node} />
    default:
      return (
        <div>
          <h1>{page?.title}</h1>
          hehe
        </div>
      )
  }

  // return (
  // 	<div>
  // 		{page?.title}
  // 	</div>
  // )
  // return <Blocks page={page} />
}
