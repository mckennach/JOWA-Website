import gql from 'graphql-tag'

export const HOME_PAGE_QUERY = gql`
  query HomePageQuery($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      id
      home {
        homeContent {
          description
          fieldGroupName
          image {
            node {
              altText
              sourceUrl(size: LARGE)
              sizes(size: LARGE)
              slug
              title
            }
          }
          ctaLink {
            url
            title
            target
          }
        }
        featuredProjects {
          nodes {
            databaseId
            uri
            id
          }
        }
      }
    }
  }
`
