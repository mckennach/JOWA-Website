import gql from 'graphql-tag'

export const POST_QUERY = gql`
  query PostQuery($id: ID!, $preview: Boolean = false) {
    post(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      content
      date
      title
      author {
        node {
          name
        }
      }
    }
  }
`
