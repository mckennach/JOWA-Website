import gql from 'graphql-tag'

export const CATEGORIES_QUERY = gql`
  query CategoriesQuery($parent: Int!) {
    categories(where: { parent: $parent }) {
      nodes {
        name
        slug
        uri
        parent {
          node {
            id
            name
            databaseId
          }
        }
        parentId
				posts {
					nodes {
						id
					}
				}
				projects {
					nodes {
						id
					}
				}
      }
    }
  }
`
