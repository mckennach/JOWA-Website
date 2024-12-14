import { RootQueryToPostConnection, TagConnection } from '@/src/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { TAGS_QUERY } from '@/src/lib/queries/general/tags'
import { cn } from '@/src/lib/utils'
import { print } from 'graphql'
import { Container, Section } from '../../craft'
import { Filter } from '../../ui/filter'
import { Text } from '../../ui/text'
import { TemplateProps } from '../page'
import { JournalItems } from './journal-items'
import { JOURNALS_QUERY } from './journal-query'
export default async function JournalTemplate({ node }: TemplateProps) {
  const { posts } = await fetchGraphQL<{ posts: RootQueryToPostConnection }>(
    print(JOURNALS_QUERY),
  )

  const { tags } = await fetchGraphQL<{ tags: TagConnection }>(
    print(TAGS_QUERY),
  )

  const filterItems = tags.nodes.filter(
    (tag) => tag?.posts && tag?.posts?.nodes?.length > 0
  )

  return (
    <>
      <Section
        className={cn(
          'before:fixed before:left-0 before:top-0 before:z-50 before:h-[250px] before:w-full before:bg-gradient-to-b before:from-background before:from-65% before:to-transparent'
        )}
      >
        <Container className="border-b pb-10 pt-44">
          <Filter
            className="fixed left-0 top-24 z-50 w-full px-4 lg:px-12"
            items={filterItems}
            columns={true}
          />
          <Text type="title1" tag="h1" className="text-accent-foreground">
            Journal
          </Text>
        </Container>
      </Section>
      {posts && posts.nodes && <JournalItems posts={posts.nodes} />}
    </>
  )
}
