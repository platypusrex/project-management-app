import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TaskFullFragment } from "../fragments/task/taskFull";

export const TasksByColumnIdQuery = gql`
  query ($columnId: Int!) {
    getTasksByColumnId (columnId: $columnId) {
      ...TaskFull
    }
  }
  ${TaskFullFragment}
`;

export const withTasksByColumnId = graphql(TasksByColumnIdQuery, {
  options: ({columnId}) => ({
    variables: {
      columnId
    },
    skip: !columnId
  }),
  name: 'tasksData'
});
