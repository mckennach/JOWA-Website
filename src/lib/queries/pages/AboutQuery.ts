import gql from 'graphql-tag'

export const ABOUT_PAGE_QUERY = gql`
  query PageQuery($id: ID!, $preview: Boolean = false) {
    page(id: $id, idType: URI, asPreview: $preview) {
      title
      aboutPage {
        title
        description
      }
    }
  }
`
