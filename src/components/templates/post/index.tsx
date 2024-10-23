import { print } from 'graphql/language/printer'

import { ContentNode, Post } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'

import { POST_QUERY } from '@/lib/queries'
import PostHero from './post-hero'
import NextPost from './next-post'

interface TemplateProps {
  node: ContentNode
}

export default async function PostTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(POST_QUERY), {
    id: node.databaseId,
  })

  return (
    <>
      <PostHero post={post} />
			{/* <PostContent post={post} /> */}
			<NextPost post={post} />
    </>
  )
}
