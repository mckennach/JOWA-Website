'use client'

import { ContentNode, Project, TagConnection } from '@/gql/graphql'
import { WORK_QUERY } from '@/lib/queries'
import { TAGS_QUERY } from '@/src/lib/queries/general/tags'
import { useQuery } from '@apollo/client'
import { Container, Section, cn } from '../../craft'
import { Filter } from '../../ui/filter'
import Loading from '../../ui/loading'
import ProjectItem from './project-item'
interface TemplateProps {
  node: ContentNode
}

export default function WorkTemplate({ node }: TemplateProps) {
  const { data: projectData, loading: projectDataLoading } = useQuery<{
    projects: { nodes: Array<Project> }
  }>(WORK_QUERY)
  const { data: tagsData, loading: tagsLoading } = useQuery<{
    tags: TagConnection
  }>(TAGS_QUERY)

  const filterItems = tagsData?.tags.nodes.filter(
    (tag) => tag?.projects && tag?.projects?.nodes?.length > 0
  )

  return (
    <Section
      className={cn(
        'filter-section relative bg-background',
        'before:fixed before:left-0 before:top-0 before:z-50 before:h-[250px] before:w-full before:bg-gradient-to-b before:from-background before:from-50% before:to-transparent'
      )}
    >
      <Container className="pt-36">
        <Filter
          label="View by"
          className="fixed left-0 top-24 z-50 w-full px-4 lg:px-12"
          items={filterItems}
          columns={false}
        />
        {projectData?.projects?.nodes ? (
          projectData?.projects?.nodes.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))
        ) : (
          <Loading />
        )}
      </Container>
    </Section>
  )
}
