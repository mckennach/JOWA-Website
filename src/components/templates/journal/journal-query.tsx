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
        imageGallery {
          image1 {
            node {
              altText
              mediaItemUrl
            }
          }
          image2 {
            node {
              altText
              mediaItemUrl
            }
          }
          image3 {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        content {
          blockQuote
          fullWidthImage {
            node {
              mediaItemUrl
              altText
            }
          }
          section1Title
          section1Copy
          section1Cta {
            alignImage
            copy
            ctaLink {
              url
              title
              target
            }
            image {
              node {
                mediaItemUrl
                altText
              }
            }
          }
          section2Title
          section2Copy
          section2Cta {
            alignImage
            copy
            ctaLink {
              target
              title
              url
            }
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
  }
`
