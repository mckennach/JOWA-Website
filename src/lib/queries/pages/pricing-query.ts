import gql from 'graphql-tag'

export const PRICING_QUERY = gql`
  query PageQuery($id: ID!, $preview: Boolean = false) {
    page(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      title
      pricing {
        title
        description
        formTitle
        disclaimer
        types {
          laneway {
            level1Standard
            level2Premium
            level3Luxury
            visualContent {
              content
              image {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
          reno {
            level1Standard
            level2Premium
            level3Luxury
            visualContent {
              content
              image {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
          newHome {
            level1Standard
            level2Premium
            level3Luxury
            visualContent {
              content
              image {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
        spaces {
          ensuites {
            maxQuantity
            price
          }
          fireplaces {
            maxQuantity
            price
          }
          fullBathrooms {
            maxQuantity
            price
          }
          indoorKitchens {
            maxQuantity
            price
          }
          outdoorKitchens {
            maxQuantity
            price
          }
          powderRooms {
            maxQuantity
            price
          }
        }
        additionalSpaces {
          basementSuite
        }
      }
    }
  }
`
