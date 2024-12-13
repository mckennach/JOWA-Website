import { ContentNode, Page } from '@/gql/graphql'
import { PAGE_QUERY } from '@/lib/queries'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { print } from 'graphql/language/printer'
import { Container, Section } from '../../craft'
import { Text } from '../../ui/text'

export interface TemplateProps {
  node: ContentNode
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PAGE_QUERY), {
    id: node.databaseId,
  })

  return (
    <Section className="py-28">
      <Container className="space-y-8">
        <Text type="title1" tag="h1">
          {page.title}
        </Text>
        <div
          className="body-sm-fluid"
          dangerouslySetInnerHTML={{ __html: page?.content ?? '' }}
        />
      </Container>
    </Section>
  )
}
