import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {ProjectByIdQuery} from "../project/withProjectById";

const UpdateColumnByIdMutation = gql`
  mutation ($columnId: Int!, $name: String) {
    updateColumnById (columnId: $columnId, name: $name) {
      id
      name
    }
  }
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
