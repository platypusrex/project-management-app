import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const ProjectsByUserIdQuery = gql`
  query ($userId: Int!) {
    getProjectsByUserId (userId: $userId) {
      id 
      createdAt
      updatedAt
      title
      description
      team {
        id
        name
      }
    }
  }
`;

export const withProjectsByUserId = graphql(ProjectsByUserIdQuery, {
  options: ({userId}) => ({
    variables: {
      userId
    },
    skip: !userId
  }),
  name: 'projectsData',
  alias: 'projectsByUserId'
});
