'use client'

import { PostConnection, TagConnection } from '@/src/gql/graphql'
import { TAGS_QUERY } from '@/src/lib/queries/general/tags'
import { cn } from '@/src/lib/utils'
import { useQuery } from '@apollo/client'
import { JOURNALS_QUERY } from '../../../lib/queries/journal/journal-query'
import { Container, Section } from '../../craft'
import { Filter } from '../../ui/filter'
import { Text } from '../../ui/text'
import { TemplateProps } from '../page'
import { JournalItems } from './journal-items'
export default function JournalTemplate({ node }: TemplateProps) {
  const { data: postsData, loading: projectDataLoading } = useQuery<{
    posts: PostConnection
  }>(JOURNALS_QUERY)
  const { data: tagsData, loading: tagsLoading } = useQuery<{
    tags: TagConnection
  }>(TAGS_QUERY)

  const filterItems = tagsData?.tags.nodes.filter(
    (tag) => tag?.projects && tag?.projects?.nodes?.length > 0
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
      {postsData?.posts?.nodes && (
        <JournalItems posts={postsData?.posts?.nodes} />
      )}
    </>
  )
}
