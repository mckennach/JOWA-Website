import gql from 'graphql-tag'

export const FEATURED_PROJECTS_QUERY = gql`
  query FeaturedProjects($ids: [ID]) {
    projects(where: { in: $ids }) {
      nodes {
        title
        slug
        uri
        featuredImage {
          node {
            altText
            mediaItemUrl
						sourceUrl(size: LARGE)
						sizes(size: LARGE)
						mimeType

          }
        }
        projectFields {
          heroImage {
						node {
              sourceUrl(size: LARGE)
              altText
              mediaItemUrl
							sizes(size: MEDIUM_LARGE)
							srcSet(size: _1536X1536)
							mimeType
							mediaDetails {
								sizes {
									mimeType
								}
							}
            }
          }
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
            node {
              sourceUrl(size: LARGE)
              altText
              mediaItemUrl
							sizes(size: MEDIUM_LARGE)
							srcSet(size: _1536X1536)
							mimeType
							mediaDetails {
								sizes {
									mimeType
								}
							}
            }
          }
        }
      }
    }
  }
`

export const MOBILE_FEATURED_PROJECTS_QUERY = gql`
  query FeaturedProjects($ids: [ID]) {
    projects(where: { in: $ids }) {
      nodes {
        title
        slug
        uri
        featuredImage {
					node {
              sourceUrl(size: LARGE)
              altText
              mediaItemUrl
							sizes(size: MEDIUM_LARGE)
							srcSet(size: _1536X1536)
							mimeType
							mediaDetails {
								sizes {
									mimeType
								}
							}
            }
        }
        projectFields {
          heroImage {
						node {
              sourceUrl(size: LARGE)
              altText
              mediaItemUrl
							sizes(size: MEDIUM_LARGE)
							srcSet(size: _1536X1536)
							mimeType
							mediaDetails {
								sizes {
									mimeType
								}
							}
            }
          }
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
            node {
              sourceUrl(size: MEDIUM_LARGE)
              altText
              mediaItemUrl
							sizes(size: MEDIUM_LARGE)
							mimeType
							mediaDetails {
								sizes {
									mimeType
								}
							}
            }
          }
        }
      }
    }
  }
`
