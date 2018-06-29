import gql from 'graphql-tag';

export const UserSmallFragment = gql`
  fragment UserSmall on User {
    id
    username
    email
    createdAt
    updatedAt
  }
`;
