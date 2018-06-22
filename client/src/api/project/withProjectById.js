import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ProjectFullFragment } from "../fragments/project/projectFull";

export const ProjectByIdQuery = gql`
	query ($projectId: Int!) {
		getProjectById (projectId: $projectId) {
			...ProjectFull
		}
	}
	${ProjectFullFragment}
`;

export const withProjectById = graphql(ProjectByIdQuery, {
	options: ({projectId}) => ({
		variables: {
			projectId
		},
		skip: !projectId
	})
});
