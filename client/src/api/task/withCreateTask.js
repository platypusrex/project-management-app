import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TasksByColumnIdQuery } from "./withTasksByColumnId";
import { TaskFullFragment } from "../fragments/task/taskFull";

const CreateTaskMutation = gql`
  mutation ($columnId: Int!, $createdBy: Int!, $task: String!) {
    createTask (columnId: $columnId, createdBy: $createdBy, task: $task) {
      ...TaskFull
    }
  }
  ${TaskFullFragment}
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
