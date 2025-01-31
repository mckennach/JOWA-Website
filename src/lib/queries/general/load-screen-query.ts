import gql from 'graphql-tag'

export const LOAD_SCREEN_QUERY = gql`
  query Loading($id: ID!) {
    global(id: $id, idType: DATABASE_ID) {
      globals {
        loadScreenText
        loadScreenImage {
          node {
            sourceUrl(size: _2048X2048)
            altText
            mediaItemUrl
            sizes(size: _2048X2048)
            srcSet(size: _2048X2048)
            mimeType
          }
        }
      }
    }
  }
`
