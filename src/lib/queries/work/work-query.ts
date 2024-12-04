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
          }
        }
        projectFields {
          description
          featuredImage {
            cursor
            node {
              altText
              mediaItemUrl
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
