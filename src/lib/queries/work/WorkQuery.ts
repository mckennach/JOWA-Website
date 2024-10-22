import gql from 'graphql-tag'

export const WORK_QUERY = gql`
  query WorkQuery {
    projects {
      nodes {
        id
        title
        slug
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
