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
import HomeContent from './home-content'
import gql from 'graphql-tag'

const FEATURED_PROJECTS_QUERY = gql`
  query FeaturedProjects($ids: [ID]) {
    projects(where: { in: $ids }) {
      nodes {
        title
        slug
        uri
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
        projectFields {
          heroImage {
            node {
              altText
              mediaItemUrl
            }
          }
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`

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
      {featuredProjects?.nodes && featuredProjects?.nodes.length > 0 && (
        <FeaturedProjects projects={projects?.nodes} />
      )}
      {homeContent && <HomeContent data={homeContent} />}
    </>
  )
}
