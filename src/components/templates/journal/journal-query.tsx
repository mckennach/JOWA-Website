import gql from 'graphql-tag'

export const JOURNALS_QUERY = gql`
  query PostsQuery {
    posts {
      nodes {
        uri
        slug
        title
        author {
          node {
            name
            nicename
            nickname
          }
        }
        date
        modified
        postData {
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
          customTitle
        }
      }
    }
  }
`
