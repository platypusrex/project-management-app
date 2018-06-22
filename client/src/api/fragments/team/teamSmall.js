import gql from 'graphql-tag';

export const TeamSmallFragment = gql`
  fragment TeamSmall on Team {
    id
    createdAt
    updatedAt
    name
    description
  }
`;
