import { print } from 'graphql'
import { Section, Container } from '../../craft'
import { Text } from '../../ui/text'
import { Post, RootQueryToPostConnection, TagConnection } from '@/src/gql/graphql'
import { TemplateProps } from '../page'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { JOURNALS_QUERY } from './journal-query'
import { TAGS_QUERY } from '@/src/lib/queries/general/tags'
import { JournalItems } from './journal-items'
import { Filter } from '../../ui/filter'
export default async function JournalTemplate({ node }: TemplateProps) {
  const { posts } = await fetchGraphQL<{ posts: RootQueryToPostConnection }>(
    print(JOURNALS_QUERY),
    {
      caches: false,
    }
  )

	const { tags } = await fetchGraphQL<{ tags: TagConnection }>(
    print(TAGS_QUERY),
    {
      caches: false,
    }
  );

	const filterItems = tags.nodes.filter((tag) => tag?.posts && tag?.posts?.nodes?.length > 0);


  return (
    <>
      <Section className="border-b pb-10 pt-44">
        <Container>
          <Filter className="fixed top-24 z-50 w-full left-0 px-4 lg:px-12" items={filterItems} />
          <Text type="title1" tag="h1" className="text-accent-foreground">
            Journal
          </Text>
        </Container>
      </Section>
      {posts && posts.nodes && <JournalItems posts={posts.nodes} />}
    </>
  )
}
