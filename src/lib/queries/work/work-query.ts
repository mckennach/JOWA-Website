import gql from 'graphql-tag'

export const WORK_QUERY = gql`
  query WorkQuery {
    projects {
      nodes {
        id
        title
        slug
        tags {
          nodes {
            name
            slug
            uri
          }
        }
        featuredImage {
          node {
            altText
            mediaItemUrl
            title
						sourceUrl(size: LARGE)
						sizes
          }
        }
        projectFields {
          description
          featuredImage {
            cursor
            node {
              altText
              mediaItemUrl
							sourceUrl(size: LARGE)
							sizes
              title
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
          heroImage {
            cursor
            node {
              altText
              mediaItemUrl
              title
							sourceUrl(size: LARGE)
							sizes
            }
          }
        }
        categories {
          nodes {
            id
            categoryId
            name
            parentId
            slug
          }
        }
      }
    }
  }
`
