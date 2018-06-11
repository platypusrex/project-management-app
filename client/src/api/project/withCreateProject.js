import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserByIdQuery } from "../user/withUserById";

const CreateCProjectMutation = gql`
	mutation ($title: String!, $description: String, $createdBy: Int!, $teamId: Int) {
		createProject (title: $title, description: $description, createdBy: $createdBy, teamId: $teamId) {
			id 
			title
			description
		}
	}
`;

export const withCreateProject = graphql(CreateCProjectMutation, {
	props: ({ownProps, mutate}) => ({
		createProject: (variables) => {
			const options = {
				variables,
				mutation: CreateCProjectMutation,
				refetchQueries: [{
					query: UserByIdQuery,
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