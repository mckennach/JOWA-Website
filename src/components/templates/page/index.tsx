import { print } from 'graphql/language/printer'
import { ContentNode, Page } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { PAGE_QUERY } from '@/lib/queries'
import Blocks from '../../blocks'

interface TemplateProps {
  node: ContentNode
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PAGE_QUERY), {
    id: node.databaseId,
  })

  return <Blocks page={page} />
}