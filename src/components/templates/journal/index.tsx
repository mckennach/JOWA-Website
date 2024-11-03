import { print } from 'graphql'
import { Section, Container } from '../../craft'
import { Text } from '../../ui/text'
import { Post, RootQueryToPostConnection } from '@/src/gql/graphql'
import { TemplateProps } from '../page'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { JOURNALS_QUERY } from './journal-query'
import { JournalItems } from './journal-items'
import { Filter } from '../../ui/filter'
export default async function JournalTemplate({ node }: TemplateProps) {
  const { posts } = await fetchGraphQL<{ posts: RootQueryToPostConnection }>(
    print(JOURNALS_QUERY),
    {
      caches: false,
    }
  )

  return (
    <>
      <Section className="border-b pb-10 pt-44">
        <Container>
          <Filter className="fixed top-24 w-full lg:left-12 z-50" />
          <Text type="title1" tag="h1" className="text-accent-foreground">
            Journal
          </Text>
        </Container>
      </Section>
      {posts && posts.nodes && <JournalItems posts={posts.nodes} />}
    </>
  )
}
