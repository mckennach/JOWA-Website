import {
  Page,
  PostFormatConnection,
  PostFormatToProjectConnection,
} from '@/gql/graphql'
import { cookies } from 'next/headers'
import { TemplateProps } from '../page'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { print } from 'graphql/language/printer'
import { HOME_PAGE_QUERY } from './home-query'
import FeaturedProjects from './featured-projects'
import HomeAbout from './home-about'
import { createCookie } from '@/src/lib/api/actions'
import gql from 'graphql-tag'
import { FEATURED_PROJECTS_QUERY } from '@/src/lib/queries/work/featured-projects-query'
import Loading from './loading'

export default async function HomePage({ node }: TemplateProps) {
  const cookieStore = await cookies()
  const loaded = cookieStore.get('animation-loaded')

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
      {/* {loaded === undefined && <Loading project={projects?.nodes[0]} />} */}
      {featuredProjects?.nodes && featuredProjects?.nodes.length > 0 && (
        <FeaturedProjects
          projects={projects?.nodes}
          noLoading={loaded !== undefined}
        />
      )}
      {homeContent && (
        <HomeAbout data={homeContent} noLoading={loaded !== undefined} />
      )}
    </>
  )
}
