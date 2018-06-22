import gql from 'graphql-tag';

export const ProjectFullFragment = gql`
  fragment ProjectFull on Project {
    id
    createdAt
    updatedAt
    title
    description
    creator {
      id
      username
    }
    team {
      id
      name
      description
    }
    columns {
      id
      name
    }
  }
`;
