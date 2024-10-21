import gql from 'graphql-tag'

export const MENU_ITEMS_QUERY = gql`
  query MenuQuery($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        uri
        target
        label
      }
    }
  }
`

export const MENU_QUERY = gql`
  query MenuQuery($location: MenuLocationEnum) {
    menuItems(where: { location: $location }) {
      nodes {
        uri
        target
        label
      }
    }
  }
`
