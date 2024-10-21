import gql from 'graphql-tag'

export const WorkQuery = gql`
  query WorkQuery {
    posts {
      nodes {
        id
        title
        content
        excerpt
        slug
        date
        tags {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`
