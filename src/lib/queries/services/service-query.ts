import gql from 'graphql-tag'

export const SERVICES_QUERY = gql`
  query ServicesQuery {
    services {
      nodes {
        title
        data {
          name
          type
        }
      }
    }
  }
`
