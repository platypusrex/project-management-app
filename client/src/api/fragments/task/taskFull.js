import gql from 'graphql-tag';

export const TaskFullFragment = gql`
  fragment TaskFull on Task {
    id
    createdAt
    updatedAt
    task
    columnId
    creator {
      username
    }
  }
`;
