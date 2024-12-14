import gql from 'graphql-tag'

export const TEAM_MEMBERS_QUERY = gql`
  query TeamMembers {
    teamMembers {
      nodes {
        memberData {
          name
          jobTitle
          image {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  }
`
