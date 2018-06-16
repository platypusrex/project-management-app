import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const TeamsByUserIdQuery = gql`
  query ($userId: Int!) {
    getTeamsByUserId (userId: $userId) {
      id
      createdAt
      updatedAt
      name
      description
    }
  }
`;

export const withTeamsByUserId = graphql(TeamsByUserIdQuery, {
  options: ({userId}) => ({
    variables: {
      userId
    },
    skip: !userId,
  }),
  name: 'teamsData',
  alias: 'teamsByUserId'
});
