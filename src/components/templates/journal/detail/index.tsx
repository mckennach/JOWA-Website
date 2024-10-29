import { print } from 'graphql'
import { TemplateProps } from '../../page'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { JOURNAL_QUERY, JOURNALS_QUERY } from '../journal-query'
import { Post, RootQueryToPostConnection } from '@/src/gql/graphql'
import JournalHero from './hero'
import JournalContent from './content'
import NextPost from './next-post'
export default async function JournalDetailTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(JOURNAL_QUERY), {
    id: node?.uri,
  }) // This is the only change in this file
  const { posts } = await fetchGraphQL<{ posts: RootQueryToPostConnection }>(
    print(JOURNALS_QUERY),
    {
      caches: false,
    }
  );

	console.log(post);
	
  return (
    <>
      <JournalHero post={post} />
      <JournalContent post={post} />
      <NextPost posts={posts} currentId={post.id} />
    </>
  )
}
