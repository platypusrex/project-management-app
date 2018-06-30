import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ProjectByIdQuery } from "../project/withProjectById";
import { ColumnSmallFragment } from "../fragments/column/columnSmall";

const CreateColumnMutation = gql`
	mutation ($projectId: Int!, $name: String!, $order: Int!) {
		createColumn (projectId: $projectId, name: $name, order: $order) {
			...ColumnSmall
		}
	}
	${ColumnSmallFragment}
`;

export const withCreateColumn = graphql(CreateColumnMutation, {
	props: ({ownProps, mutate}) => ({
		createColumn: async (variables) => {
			const options = {
				variables,
				mutation: CreateColumnMutation,
				refetchQueries: [{
					query: ProjectByIdQuery,
					variables: {
						projectId: variables.projectId
					}
				}]
			};

			if (!mutate) {
				throw new Error('withCreateColumn: missing mutate');
			}

			return mutate(options);
		}
	})
});
