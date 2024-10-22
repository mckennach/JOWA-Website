import gql from 'graphql-tag'

export const WORK_DETAIL_QUERY = gql`
  query WorkDetailQuery($id: ID!, $preview: Boolean = false) {
    project(id: $id, idType: URI, asPreview: $preview) {
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
`
