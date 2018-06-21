import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ProjectsByUserIdQuery } from "./withProjectsByUserId";
import { ProjectSmallFragment } from "../fragments/project/projectSmall";
import { getUserId } from "../../shared/utils/localStorageUtil";

const UpdateProjectByIdMutation = gql`
	mutation ($projectId: Int!, $title: String, $description: String, $teamId: Int) {
		updateProjectById (projectId: $projectId, title: $title, description: $description, teamId: $teamId) {
      ...ProjectSmall
		}
	}
	${ProjectSmallFragment}
`;

export const withUpdateProjectById = graphql(UpdateProjectByIdMutation, {
	props: ({ownProps, mutate}) => ({
		updateProjectById: async (variables) => {
			const userId = getUserId();
			const options = {
				variables,
				mutation: UpdateProjectByIdMutation,
				refetchQueries: [{
					query: ProjectsByUserIdQuery,
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
