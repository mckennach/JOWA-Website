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
						sourceUrl(size: _1536X1536)
						sizes(size: _1536X1536)

          }
        }
        projectFields {
          heroImage {
            node {
              sourceUrl(size: _1536X1536)
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
              sourceUrl(size: _1536X1536)
              altText
              mediaItemUrl
							sizes(size: _1536X1536)
            }
          }
        }
      }
    }
  }
`
