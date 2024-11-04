import gql from 'graphql-tag'

export const WORK_QUERY = gql`
  query WorkQuery {
    projects {
      nodes {
        id
        title
        slug
				tags {
					nodes {
						name
						slug
						uri
					}
				}
        featuredImage {
          node {
            altText
            mediaItemUrl
            title
          }
        }
        projectFields {
          description
          fullWidthImage2 {
            cursor
            node {
              altText
              mediaItemUrl
              title
            }
          }
          featuredImage {
            cursor
            node {
              altText
              mediaItemUrl
              title
            }
          }
          heroImage {
            cursor
            node {
              altText
              mediaItemUrl
              title
            }
          }
          introFullWidthImage {
            node {
              mediaItemUrl
              altText
            }
          }
          imageGallery {
            image1 {
              node {
                mediaItemUrl
                altText
              }
            }
            image1Caption
            image2Caption
            image2 {
              node {
                altText
                mediaItemUrl
              }
            }
          }
          project {
            content
            image {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
        categories {
          nodes {
            id
            categoryId
            name
            parentId
            slug
          }
        }
      }
    }
  }
`
