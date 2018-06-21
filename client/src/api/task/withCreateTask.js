import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TasksByColumnIdQuery} from "./withTasksByColumnId";

const CreateTaskMutation = gql`
  mutation ($columnId: Int!, $createdBy: Int!, $task: String!) {
    createTask (columnId: $columnId, createdBy: $createdBy, task: $task) {
      id
      createdAt
      updatedAt
      task
    }
  }
`;

export const withCreateTask = graphql(CreateTaskMutation, {
  props: ({ownProps, mutate}) => ({
    createTask: async (variables) => {
      const options = {
        variables,
        mutation: CreateTaskMutation,
        refetchQueries: [{
          query: TasksByColumnIdQuery,
          variables: {
            columnId: ownProps.columnId
          }
        }]
      };

      if (!mutate) {
        throw new Error('withCreateTask: missing mutate');
      }

      return mutate(options);
    }
  })
});
