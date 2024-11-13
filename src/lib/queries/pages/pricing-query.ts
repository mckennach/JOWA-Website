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
						label
            full
						partial
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
						label
            full
						partial
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
          newBuild {
						label
            full
						partial
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
