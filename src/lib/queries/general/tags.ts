import gql from "graphql-tag";

export const TAGS_QUERY = gql`
	query TagsQuery {
		tags {
			nodes {
				name
				id
				slug
				uri
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
`;