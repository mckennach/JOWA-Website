import { Section, Container, cn } from '../../craft'
import { print } from 'graphql/language/printer'
import { ContentNode, CategoryToPostConnection, Post, Tag } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { WORK_QUERY } from '@/lib/queries'
import WorkItem from './work-item'
interface TemplateProps {
  node: ContentNode
}

export default async function WorkTemplate({ node }: TemplateProps) {
  const {
    posts: { nodes },
  } = await fetchGraphQL<{ posts: { nodes: Array<Post> } }>(print(WORK_QUERY))

  return (
    <Section className="bg-secondary">
      <Container>
        {nodes.map((post) => (
          <WorkItem key={post.id} post={post} />
        ))}
      </Container>
    </Section>
  )
}