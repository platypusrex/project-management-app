import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TeamFullFragment } from "../fragments/team/teamFull";

const TeamByIdQuery = gql`
  query ($teamId: Int!) {
    getTeamById (teamId: $teamId) {
      ...TeamFull
    }
  }
  ${TeamFullFragment}
`;

export const withTeamById = graphql(TeamByIdQuery, {
  options: ({teamId}) => ({
    variables: {
      teamId
    },
    skip: !teamId
  }),
  name: 'teamData'
});
