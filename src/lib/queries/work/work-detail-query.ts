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
					category
					projectType
					services {
						service
					}
        }
        featuredImage {
          cursor
          node {
            altText
            sourceUrl(size: _1536X1536)
            mediaItemUrl
            title
          }
        }
        heroImage {
          cursor
          node {
            altText
            sourceUrl(size: _1536X1536)
            mediaItemUrl
            title
          }
        }
        content {
          ... on ProjectFieldsContentTextImageSectionLayout {
            content
            fieldGroupName
            image {
              node {
                altText
                sourceUrl
              }
            }
          }
          ... on ProjectFieldsContentFullWidthImageLayout {
            fieldGroupName
            image {
              node {
                altText
                sourceUrl
              }
            }
          }
          ... on ProjectFieldsContentImageGalleryLayout {
            fieldGroupName
            images {
              caption
              image {
                node {
                  altText
                  sourceUrl
                }
              }
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
