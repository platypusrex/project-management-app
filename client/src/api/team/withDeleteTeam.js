import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserByIdQuery } from "../user/withUserById";
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
					query: UserByIdQuery,
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