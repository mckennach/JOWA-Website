import gql from 'graphql-tag'

export const WORK_DETAIL_QUERY = gql`
  query WorkDetailQuery($id: ID!, $preview: Boolean = false) {
    project(id: $id, idType: URI, asPreview: $preview) {
      id
      title
      slug
      projectFields {
        description
        fieldGroupName
        projectInfo {
          location
          sqFt
        }
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
        }
      }
    }
  }
`

export const WORK_CATOGERY_QUERY = gql`
  query WorkDetailQuery($id: ID!, $categoryId: ID!, $preview: Boolean = false) {
    project(id: $id, idType: URI, asPreview: $preview) {
      categories(where: { parent: $categoryId }) {
        nodes {
          id
          categoryId
          name
          parentId
        }
      }
    }
  }
`
