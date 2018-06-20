import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const TasksByColumnIdQuery = gql`
  query ($columnId: Int!) {
    getTasksByColumnId (columnId: $columnId) {
      id
      createdAt
      updatedAt
      task
      creator {
        username
      }
    }
  }
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
