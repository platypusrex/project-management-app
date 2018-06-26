import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TeamsByUserIdQuery } from "./withTeamsByUserId";
import { TeamByIdQuery } from "./withTeamById";
import { TeamSmallFragment } from "../fragments/team/teamSmall";
import { getUserId } from "../../shared/utils/localStorageUtil";

const UpdateTeamByIdMutation = gql`
	mutation ($teamId: Int!, $name: String, $description: String, $website: String, $companyName: String) {
		updateTeamById (
      teamId: $teamId, 
      name: $name, 
      description: $description, 
      website: $website, 
      companyName: $companyName
		) {
      ...TeamSmall
		}
	}
	${TeamSmallFragment}
`;

export const withUpdateTeamById = graphql(UpdateTeamByIdMutation, {
	props: ({ownProps, mutate}) => ({
		updateTeamById: async (variables) => {
			const userId = getUserId();

			const options = {
				variables,
				mutation: UpdateTeamByIdMutation,
				refetchQueries: [
				  {
            query: TeamsByUserIdQuery,
            variables: {
              userId
            }
          },
          {
            query: TeamByIdQuery,
            variables: {
              teamId: ownProps.team.id
            }
          }
				]
			};

			if (!mutate) {
				throw new Error('withUpdateTeamById: missing mutate');
			}

			return mutate(options);
		}
	})
});
