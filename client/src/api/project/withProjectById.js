import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const ProjectByIdQuery = gql`
	query ($projectId: Int!) {
		getProjectById (projectId: $projectId) {
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
				description
			}
			columns {
				id
				name
			}
		}
	}
`;

export const withProjectById = graphql(ProjectByIdQuery, {
	options: ({projectId}) => ({
		variables: {
			projectId
		},
		skip: !projectId
	})
});