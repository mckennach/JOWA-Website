import {
  Page,
  PostFormatConnection,
  PostFormatToProjectConnection,
} from '@/gql/graphql'
import { TemplateProps } from '../page'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { print } from 'graphql/language/printer'
import { HOME_PAGE_QUERY } from './home-query'
import FeaturedProjects from './featured-projects'
import HomeAbout from './home-about'
import gql from 'graphql-tag'
import { FEATURED_PROJECTS_QUERY } from '@/src/lib/queries/work/featured-projects-query'
import Loading from './loading'

export default async function HomePage({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(HOME_PAGE_QUERY), {
    id: node.databaseId,
  })

  const { featuredProjects, homeContent } = page.home ?? {}
  const projectIds = featuredProjects?.nodes.map((project) => project.id)

  const { projects } = await fetchGraphQL<{
    projects: PostFormatToProjectConnection
  }>(print(FEATURED_PROJECTS_QUERY), {
    ids: projectIds,
  })

  return (
    <>
			{/* <Loading project={projects?.nodes[0]} /> */}
      {featuredProjects?.nodes && featuredProjects?.nodes.length > 0 && (
        <FeaturedProjects projects={projects?.nodes} />
      )}
      {homeContent && <HomeAbout data={homeContent} />}
    </>
  )
}
