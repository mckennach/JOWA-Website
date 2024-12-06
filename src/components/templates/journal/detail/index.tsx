import { Post, RootQueryToPostConnection } from '@/src/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { print } from 'graphql'
import { TemplateProps } from '../../page'
import { JOURNAL_QUERY, JOURNALS_QUERY } from '../journal-query'
import JournalHero from './hero'
import NextPost from './next-post'
import JournalPostContent from './post-content'
export default async function JournalDetailTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(JOURNAL_QUERY), {
    id: node?.uri,
  }) // This is the only change in this file
  const { posts } = await fetchGraphQL<{ posts: RootQueryToPostConnection }>(
    print(JOURNALS_QUERY),
    {
      caches: true,
    }
  )

  return (
    <article id={`post-${post?.id}`}>
      <JournalHero post={post} />
      <JournalPostContent post={post} />
      <NextPost posts={posts} currentId={post.id} />
    </article>
  )
}
