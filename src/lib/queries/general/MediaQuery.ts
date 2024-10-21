import gql from 'graphql-tag'

export const MEDIA_QUERY = gql`
  query MediaQuery($id: ID!) {
    mediaItem(id: $id, idType: DATABASE_ID) {
      altText
      mediaItemUrl
      uri
      link
    }
  }
`
