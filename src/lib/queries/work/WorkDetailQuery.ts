import gql from 'graphql-tag'

export const WORK_DETAIL_QUERY = gql`
  query WorkDetailQuery($id: ID!, $preview: Boolean = false) {
    page(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      content
      blocks(
        attributes: true
        htmlContent: true
        postTemplate: true
        dynamicContent: true
        originalContent: true
      )
    }
  }
`