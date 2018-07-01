import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { apolloClient } from "../apiGraphqlUtil";
import { ProjectsByUserIdQuery } from "./withProjectsByUserId";
import { ProjectSmallFragment } from "../fragments/project/projectSmall";
import { ProjectsByTeamIdQuery } from "./withProjectsByTeamId";

const CreateProjectMutation = gql`
	mutation ($title: String!, $description: String, $createdBy: Int!, $teamId: Int) {
		createProject (title: $title, description: $description, createdBy: $createdBy, teamId: $teamId) {
			...ProjectSmall
		}
	}
	${ProjectSmallFragment}
`;

export async function createProject (variables, hasTeamAssociation) {
  const options = {
    variables,
    mutation: CreateProjectMutation,
    refetchQueries: () => hasTeamAssociation ?
      [{
        query: ProjectsByTeamIdQuery,
        variables: {teamId: variables.teamId}
      }]
      :
      [{
        query: ProjectsByUserIdQuery,
        variables: {userId: variables.createdBy}
      }]
  };

  return apolloClient.mutate(options);
}

export const withCreateProject = graphql(CreateProjectMutation, {
	props: ({ownProps, mutate}) => ({
		createProject: (variables) => {
			const options = {
				variables,
				mutation: CreateProjectMutation,
				refetchQueries: [
				  {
            query: ProjectsByUserIdQuery,
            variables: {
              userId: variables.createdBy
            },
          },
          {
            query: ProjectsByTeamIdQuery,
            variables: {
              teamId: ownProps.teamId
            }
          }
				]
			};

			if (!mutate) {
				throw new Error('withCreateProject: missing mutate');
			}

			return mutate(options);
		}
	})
});
