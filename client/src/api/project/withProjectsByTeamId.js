import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ProjectFullFragment } from "../fragments/project/projectFull";

export const ProjectsByTeamId = gql`
  query ($teamId: Int!) {
    getProjectsByTeamId (teamId: $teamId) {
      ...ProjectFull
    }
  }
  ${ProjectFullFragment}
`;

export const withProjectsByTeamId = graphql(ProjectsByTeamId, {
  options: ({teamId}) => ({
    variables: {
      teamId
    },
    skip: !teamId
  }),
  name: 'projectsData'
});
