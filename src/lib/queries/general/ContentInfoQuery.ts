import gql from 'graphql-tag'

export const CONTENT_INFO_QUERY = gql`
  query ContentInfo($slug: ID!, $idType: ContentNodeIdTypeEnum!) {
    contentNode(id: $slug, idType: $idType) {
      contentTypeName
      databaseId
      status
      uri
    }
  }
`
