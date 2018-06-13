import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserByIdQuery } from "../user/withUserById";
import { getUserId } from "../../shared/utils/localStorageUtil";

const UpdateProjectByIdMutation = gql`
	mutation ($projectId: Int!, $title: String, $description: String, $teamId: Int) {
		updateProjectById (projectId: $projectId, title: $title, description: $description, teamId: $teamId) {
      id
      title
      description
		}
	}
`;

export const withUpdateProjectById = graphql(UpdateProjectByIdMutation, {
	props: ({ownProps, mutate}) => ({
		updateProjectById: async (variables) => {
			const userId = getUserId();
			const options = {
				variables,
				mutation: UpdateProjectByIdMutation,
				refetchQueries: [{
					query: UserByIdQuery,
					variables: {
						userId
					}
				}]
			};

			if (!mutate) {
				throw new Error('withUpdateProjectById: missing mutate');
			}

			return mutate(options);
		}
	})
});
