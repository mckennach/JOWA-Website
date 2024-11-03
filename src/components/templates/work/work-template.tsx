import { Section, Container, cn } from '../../craft'
import { print } from 'graphql/language/printer'
import {
  ContentNode,
  Category,
  CategoryToPostConnection,
  Project,
  Tag,
} from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { WORK_QUERY } from '@/lib/queries'
import ProjectItem from './project-item'
import { Filter } from '../../ui/filter'
import { CATEGORIES_QUERY } from '../../../lib/queries/posts/categories'
interface TemplateProps {
  node: ContentNode
}

export default async function WorkTemplate({ node }: TemplateProps) {
  const {
    projects: { nodes },
  } = await fetchGraphQL<{ projects: { nodes: Array<Project> } }>(
    print(WORK_QUERY)
  )

  const { categories } = await fetchGraphQL<{
    categories: { nodes: Array<Category> }
  }>(print(CATEGORIES_QUERY), {
    parent: 1370,
  });

	const filterItems = categories.nodes.filter((category: Category) => category && category.projects && category.projects.nodes.length > 0);

  return (
    <Section className="bg-secondary">
      <Container>
        <Filter
          className="sticky top-24 z-50 lg:left-12"
          items={filterItems}
        />
        {nodes.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </Container>
    </Section>
  )
}
