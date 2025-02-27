import { Page, PostFormatToProjectConnection } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { FEATURED_PROJECTS_QUERY } from '@/src/lib/queries/work/featured-projects-query'
import { print } from 'graphql/language/printer'
import { Fragment, lazy, Suspense } from 'react'
import { HOME_PAGE_QUERY } from '../../../lib/queries/pages/home-query'
import FloatingContact from '../../footer/floating-contact'
import PricingCTA from '../../footer/pricing-cta'
import Loading from '../../ui/loading'
import { TemplateProps } from '../page'

const HomeAbout = lazy(() => import('./home-about'))
const FeaturedProjects = lazy(() => import('./featured-projects'))

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
    <Fragment>
      <Suspense fallback={<Loading />}>
        {projects &&
          featuredProjects &&
          featuredProjects?.nodes &&
          featuredProjects?.nodes.length > 0 && (
            <FeaturedProjects
              projectIds={projectIds}
              projects={projects?.nodes}
            />
          )}
      </Suspense>
      <Suspense fallback={<Loading />}>
        {homeContent && <HomeAbout data={homeContent} noLoading={true} />}
      </Suspense>
      <PricingCTA />
      <FloatingContact />
    </Fragment>
  )
}
