import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TasksByColumnIdQuery } from "./withTasksByColumnId";
import { TaskFullFragment } from "../fragments/task/taskFull";

const UpdateTaskByIdMutation = gql`
  mutation ($taskId: Int!, $columnId: Int, $task: String) {
    updateTaskById (taskId: $taskId, columnId: $columnId, task: $task) {
      ...TaskFull
    }
  }
  ${TaskFullFragment}
`;

export const withUpdateTaskById = graphql(UpdateTaskByIdMutation, {
  props: ({ownProps, mutate}) => ({
    updateTaskById: async (variables) => {
      const options = {
        variables,
        mutation: UpdateTaskByIdMutation,
        refetchQueries: [
          {
            query: TasksByColumnIdQuery,
            variables: {
              columnId: ownProps.columnId
            }
          },
          {
            query: TasksByColumnIdQuery,
            variables: {
              columnId: variables.columnId,
              skip: !variables.columnId
            }
          }
        ]
      };

      if (!mutate) {
        throw new Error('withUpdateTaskById: missing mutate');
      }

      return mutate(options);
    }
  })
});
