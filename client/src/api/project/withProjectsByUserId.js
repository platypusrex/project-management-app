import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ProjectSmallFragment } from "../fragments/project/projectSmall";

export const ProjectsByUserIdQuery = gql`
  query ($userId: Int!) {
    getProjectsByUserId (userId: $userId) {
      ...ProjectSmall
    }
  }
  ${ProjectSmallFragment}
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
