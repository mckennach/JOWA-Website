import gql from 'graphql-tag'

export const GLOBALS_QUERY = gql`
  query Globals($id: ID!) {
    global(id: $id, idType: DATABASE_ID) {
      globals {
        credits {
          target
          title
          url
        }
        email {
          target
          title
          url
        }
        instagram {
          target
          title
          url
        }
        phone {
          target
          title
          url
        }
      }
    }
  }
`
