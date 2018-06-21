import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TeamSmallFragment } from "../fragments/team/teamSmall";

export const TeamsByUserIdQuery = gql`
  query ($userId: Int!) {
    getTeamsByUserId (userId: $userId) {
      ...TeamSmall
    }
  }
  ${TeamSmallFragment}
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
