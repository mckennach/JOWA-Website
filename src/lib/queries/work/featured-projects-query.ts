import gql from 'graphql-tag'

export const FEATURED_PROJECTS_QUERY = gql`
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
						sourceUrl(size: LARGE)
						sizes(size: LARGE)

          }
        }
        projectFields {
          heroImage {
            node {
              sourceUrl(size: LARGE)
              altText
              mediaItemUrl
            }
          }
          projectInfo {
            location
            sqFt
            category
            projectType
            services {
              service
            }
          }
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              altText
              mediaItemUrl
							sizes(size: LARGE)
            }
          }
        }
      }
    }
  }
`
