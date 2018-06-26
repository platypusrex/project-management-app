import gql from 'graphql-tag';

export const TeamFullFragment = gql`
  fragment TeamFull on Team {
    id
    createdAt
    updatedAt
    name
    description
    website
    companyName
    creator {
      id 
      username
    }
  }
`;
