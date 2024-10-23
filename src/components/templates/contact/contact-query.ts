import gql from 'graphql-tag'

export const CONTACT_PAGE_QUERY = gql`
  query ContactPageQuery($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      id
      contactPage {
        title
        formTitle
        description
        instagram
        phoneNumber
        emailAddress
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`
