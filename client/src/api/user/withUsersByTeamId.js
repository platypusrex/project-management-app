import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UserSmallFragment } from "../fragments/user/userSmall";

export const UsersByTeamIdQuery = gql`
  query ($teamId: Int!) {
    getUsersByTeamId (teamId: $teamId) {
      ...UserSmall
    }
  }
  ${UserSmallFragment}
`;

export const withUsersByTeamId = graphql(UsersByTeamIdQuery, {
  options: ({teamId}) => ({
    variables: {
      teamId
    },
    skip: !teamId
  }),
  name: 'usersData'
});
