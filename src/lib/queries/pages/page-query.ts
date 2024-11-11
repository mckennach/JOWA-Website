import gql from 'graphql-tag'

export const PAGE_QUERY = gql`
  query PageQuery($id: ID!, $preview: Boolean = false) {
    page(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      title
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
