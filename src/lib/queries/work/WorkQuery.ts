import gql from 'graphql-tag'

export const WORK_QUERY = gql`
  query WorkQuery {
    projects {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            altText
            mediaItemUrl
            title
          }
        }
        projectFields {
          description
          fieldGroupName
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
          }
        }
      }
    }
  }
`
