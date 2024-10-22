import { print } from 'graphql/language/printer'

import { ContentNode, Post } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'

import { POST_QUERY } from '@/lib/queries'

interface TemplateProps {
  node: ContentNode
}

export default async function PostTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(POST_QUERY), {
    id: node.databaseId,
  })

  return (
    <div>
      <h1>{post.title}</h1>
      <div>By {post.author?.node.name}</div>

      <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
    </div>
  )
}
