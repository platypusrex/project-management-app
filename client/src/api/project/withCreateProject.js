import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ProjectsByUserIdQuery } from "./withProjectsByUserId";
import { ProjectSmallFragment } from "../fragments/project/projectSmall";

const CreateProjectMutation = gql`
	mutation ($title: String!, $description: String, $createdBy: Int!, $teamId: Int) {
		createProject (title: $title, description: $description, createdBy: $createdBy, teamId: $teamId) {
			...ProjectSmall
		}
	}
	${ProjectSmallFragment}
`;

export const withCreateProject = graphql(CreateProjectMutation, {
	props: ({ownProps, mutate}) => ({
		createProject: (variables) => {
			const options = {
				variables,
				mutation: CreateProjectMutation,
				refetchQueries: [{
					query: ProjectsByUserIdQuery,
					variables: {
						userId: variables.createdBy
					}
				}]
			};

			if (!mutate) {
				throw new Error('withCreateProject: missing mutate');
			}

			return mutate(options);
		}
	})
});
