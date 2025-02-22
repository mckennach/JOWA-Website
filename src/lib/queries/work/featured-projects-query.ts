import gql from 'graphql-tag'

export const FEATURED_PROJECTS_QUERY = gql`
  query FeaturedProjects($ids: [ID]) {
    projects(where: { in: $ids }) {
      nodes {
        title
        slug
        uri
        projectFields {
          featuredImage {
            node {
              sourceUrl(size: _2048X2048)
              altText
              mediaItemUrl
              sizes(size: _1536X1536)
              srcSet(size: _1536X1536)
              mimeType
            }
          }
          mobileFeaturedImage {
            node {
              sourceUrl(size: _1536X1536)
              altText
              mediaItemUrl
              sizes(size: MEDIUM_LARGE)
              srcSet(size: _1536X1536)
              mimeType
            }
          }
        }
      }
    }
  }
`

export const LOADING_PROJECTS_QUERY = gql`
  query FeaturedProjects($ids: [ID]) {
    projects(where: { in: $ids }) {
      nodes {
        title
        slug
        uri
        projectFields {
          heroImage {
            node {
              sourceUrl(size: MEDIUM)
              altText
              mediaItemUrl
              sizes(size: MEDIUM)
              srcSet(size: MEDIUM)
              mimeType
            }
          }
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              altText
              mediaItemUrl
              sizes(size: LARGE)
              srcSet(size: LARGE)
              mimeType
            }
          }
          mobileFeaturedImage {
            node {
              sourceUrl(size: MEDIUM)
              altText
              mediaItemUrl
              sizes(size: MEDIUM)
              srcSet(size: MEDIUM)
              mimeType
            }
          }
        }
      }
    }
  }
`
