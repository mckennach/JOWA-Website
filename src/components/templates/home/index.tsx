import { Page } from '@/gql/graphql'
import { TemplateProps } from '../page'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import { print } from 'graphql/language/printer'
import { HOME_PAGE_QUERY } from './home-query'
import FeaturedProjects from './featured-projects'
import HomeContent from './home-content'

export default async function HomePage({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(HOME_PAGE_QUERY), {
    id: node.databaseId,
  })

  const { featuredProjects, homeContent } = page.home ?? {}

  return (
    <>
      {featuredProjects?.nodes && featuredProjects?.nodes.length > 0 && (
        <FeaturedProjects projects={featuredProjects} />
      )}
      {homeContent && <HomeContent data={homeContent} />}
    </>
  )
}
