import gql from 'graphql-tag'

export const JOURNALS_QUERY = gql`
  query PostsQuery {
    posts {
      nodes {
        id
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
        tags {
          nodes {
            name
            slug
            uri
          }
        }
        date
        modified
        postData {
          featuredImage {
            node {
              mediaItemUrl
              sourceUrl(size: MEDIUM_LARGE)
              sizes(size: MEDIUM_LARGE)
              altText
            }
          }
          customTitle
        }
      }
    }
  }
`

export const JOURNAL_QUERY = gql`
  query JournalDetailQuery($id: ID!, $preview: Boolean = false) {
    post(id: $id, idType: URI, asPreview: $preview) {
      id
      title
      date
      tags {
        nodes {
          name
          slug
          uri
        }
      }
      author {
        node {
          name
          nicename
          nickname
        }
      }
      postData {
        heroImage {
          node {
            mediaItemUrl
            altText
            uri
            title
          }
        }
        tags {
          nodes {
            name
            slug
            id
          }
        }
        customTitle
        credits
        postContent {
          ... on PostDataPostContentTextSectionLayout {
            fieldGroupName
            description
            title
          }
          ... on PostDataPostContentImageTextSectionLayout {
            fieldGroupName
            description
            title
            image {
              node {
                altText
                sourceUrl
              }
            }
          }
          ... on PostDataPostContentBlockquoteLayout {
            fieldGroupName
            text
          }
          ... on PostDataPostContentFullWidthImageLayout {
            fieldGroupName
            image {
              node {
                altText
                sourceUrl
              }
            }
          }
          ... on PostDataPostContentImageGalleryLayout {
            fieldGroupName
            images {
              nodes {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`
