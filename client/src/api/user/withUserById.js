import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const UserByIdQuery = gql`
	query ($userId: Int!) {
		getUserById (userId: $userId) {
			id
			username
			email
			company {
				id
				name
			}
			teams {
				id
				name
				description
			}
			projects {
				id
				createdAt
				updatedAt
				title
				description
				creator {
					id
					username
				}
				team {
				  id
				  name
				}
			}
		}
	}
`;

export const withUserById = graphql(UserByIdQuery, {
	options: ({userId}) => ({
		variables: {
			userId
		},
		skip: !userId,
	})
});
