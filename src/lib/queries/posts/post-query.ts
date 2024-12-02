import gql from 'graphql-tag'

export const POST_QUERY = gql`
  query PostQuery($id: ID!, $preview: Boolean = false) {
    post(id: $id, idType: DATABASE_ID, asPreview: $preview) {
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
      date
      modified
      postData {
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
        heroImage {
          node {
            mediaItemUrl
            altText
          }
        }
        content
        postContent {
          ... on PostDataPostContentTextSectionLayout {
            description
            title
          }
          ... on PostDataPostContentImageTextSectionLayout {
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
            text
          }
          ... on PostDataPostContentFullWidthImageLayout {
            image {
              node {
                altText
                sourceUrl
              }
            }
          }
          ... on PostDataPostContentImageGalleryLayout {
            images {
              nodes {
                altText
                sourceUrl
              }
            }
          }
        }
        customTitle
        tags {
          nodes {
            name
            link
            slug
          }
        }
      }
    }
  }
`
