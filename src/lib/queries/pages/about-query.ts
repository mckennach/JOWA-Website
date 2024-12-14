import gql from 'graphql-tag'

export const ABOUT_PAGE_QUERY = gql`
  query PageQuery($id: ID!, $preview: Boolean = false) {
    page(id: $id, idType: URI, asPreview: $preview) {
      title
      aboutPage {
        title
        description
        logoDescription
        ourProcess {
          title
          description
          image {
            node {
              altText
              sourceUrl
            }
          }
        }
        ourServices {
          title
        }
        specificServices {
          title
        }
        showTeamMembers
      }
    }
  }
`
