import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ProjectByIdQuery } from "../project/withProjectById";
import { ColumnSmallFragment } from "../fragments/column/columnSmall";

const UpdateColumnByIdMutation = gql`
  mutation ($columnId: Int!, $name: String, $order: Int) {
    updateColumnById (columnId: $columnId, name: $name, order: $order) {
      ...ColumnSmall
    }
  }
  ${ColumnSmallFragment}
`;

export const withUpdateColumnById = graphql(UpdateColumnByIdMutation, {
  props: ({ownProps, mutate}) => ({
    updateColumnById: async (variables) => {
      const options = {
        variables,
        mutation: UpdateColumnByIdMutation,
        refetchQueries: [{
          query: ProjectByIdQuery,
          variables: {
            projectId: ownProps.projectId
          }
        }]
      };

      if (!mutate) {
        throw new Error('withUpdateColumnById: missing mutate');
      }

      return mutate(options);
    }
  })
});
