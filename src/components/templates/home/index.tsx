import { Page, PostFormatToProjectConnection } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import {
  FEATURED_PROJECTS_QUERY,
  LOADING_PROJECTS_QUERY,
} from '@/src/lib/queries/work/featured-projects-query'
import { print } from 'graphql/language/printer'
import { cookies } from 'next/headers'
import { lazy } from 'react'
import { HOME_PAGE_QUERY } from '../../../lib/queries/pages/home-query'
import FloatingContact from '../../footer/floating-contact'
import PricingCTA from '../../footer/pricing-cta'
import { TemplateProps } from '../page'

const HomeAbout = lazy(() => import('./home-about'))
const FeaturedProjects = lazy(() => import('./featured-projects'))

export default async function HomePage({ node }: TemplateProps) {
  const cookieStore = await cookies()
  const loaded = cookieStore.get('animation-loaded')

  const { page } = await fetchGraphQL<{ page: Page }>(print(HOME_PAGE_QUERY), {
    id: node.databaseId,
  })

  const { featuredProjects, homeContent } = page.home ?? {}
  const projectIds = featuredProjects?.nodes.map((project) => project.id)

  const { projects: loadingProjects } = await fetchGraphQL<{
    projects: PostFormatToProjectConnection
  }>(print(LOADING_PROJECTS_QUERY), {
    ids: projectIds,
  })

  const { projects } = await fetchGraphQL<{
    projects: PostFormatToProjectConnection
  }>(print(FEATURED_PROJECTS_QUERY), {
    ids: projectIds,
  })

  if (!projects || !featuredProjects) return null

  return (
    <>
      {featuredProjects?.nodes && featuredProjects?.nodes.length > 0 && (
        <FeaturedProjects
          projectIds={projectIds}
          projects={projects?.nodes}
          loadingProjects={loadingProjects?.nodes}
        />
      )}
      {homeContent && (
        <HomeAbout data={homeContent} noLoading={loaded !== undefined} />
      )}
      <PricingCTA />
      <FloatingContact />
    </>
  )
}
