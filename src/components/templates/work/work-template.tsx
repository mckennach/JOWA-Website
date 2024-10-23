import { Section, Container, cn } from '../../craft'
import { print } from 'graphql/language/printer'
import {
  ContentNode,
  CategoryToPostConnection,
  Project,
  Tag,
} from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { WORK_QUERY } from '@/lib/queries'
import ProjectItem from './project-item'
import { Filter } from '../../ui/filter'
interface TemplateProps {
  node: ContentNode
}

export default async function WorkTemplate({ node }: TemplateProps) {
  const {
    projects: { nodes },
  } = await fetchGraphQL<{ projects: { nodes: Array<Project> } }>(
    print(WORK_QUERY)
  )

  return (
    <Section className="bg-secondary">
      <Container>
        <Filter className="sticky top-24 lg:left-12" />
        {nodes.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </Container>
    </Section>
  )
}
