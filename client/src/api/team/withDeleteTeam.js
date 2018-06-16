import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TeamsByUserIdQuery } from "./withTeamsByUserId";
import { getUserId } from "../../shared/utils/localStorageUtil";

const DeleteTeamMutation = gql`
	mutation ($teamId: Int!) {
		deleteTeam (teamId: $teamId) 
	}
`;

export const withDeleteTeam = graphql(DeleteTeamMutation, {
	props: ({ownProps, mutate}) => ({
		deleteTeam: async (variables) => {
			const userId = getUserId();

			const options = {
				variables,
				mutation: DeleteTeamMutation,
				refetchQueries: [{
					query: TeamsByUserIdQuery,
					variables: {
						userId
					},
				}],
			};

			if (!mutate) {
				throw new Error('withDeleteTeam: missing mutate');
			}

			return mutate(options);
		}
	})
});
