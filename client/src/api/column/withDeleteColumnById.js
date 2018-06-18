import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ProjectByIdQuery } from "../project/withProjectById";

const DeleteColumnByIdMutation = gql`
  mutation ($columnId: Int!) {
    deleteColumnById (columnId: $columnId)
  }
`;

export const withDeleteColumnById = graphql(DeleteColumnByIdMutation, {
  props: ({ownProps, mutate}) => ({
    deleteColumnById: async (variables) => {
      const options = {
        variables,
        mutation: DeleteColumnByIdMutation,
        refetchQueries: [{
          query: ProjectByIdQuery,
          variables: {
            projectId: ownProps.projectId
          }
        }]
      };

      if (!mutate) {
        throw new Error('withDeleteColumnById: missing mutate');
      }

      return mutate(options);
    }
  })
});
