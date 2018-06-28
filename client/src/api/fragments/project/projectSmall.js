import gql from 'graphql-tag';

export const ProjectSmallFragment = gql`
  fragment ProjectSmall on Project {
    id 
    createdAt
    updatedAt
    title
    description
    team {
      id
    }
  }
`;
