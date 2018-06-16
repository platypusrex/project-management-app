import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TeamsByUserIdQuery } from "./withTeamsByUserId";

const createTeamMutation = gql`
	mutation ($name: String!, $description: String, $createdBy: Int!) {
		createTeam (name: $name, description: $description, createdBy: $createdBy) {
			id 
			name
			description
		}
	}
`;

export const withCreateTeam = graphql(createTeamMutation, {
	props: ({ownProps, mutate}) => ({
		createTeam: async (variables) => {
			const options = {
				variables,
				mutation: createTeamMutation,
				refetchQueries: [{
					query: TeamsByUserIdQuery,
					variables: {
						userId: variables.createdBy,
					},
				}],
			};

			if (!mutate) {
				throw new Error('withCreateTeam: missing mutate');
			}

			return mutate(options);
		}
	})
});
