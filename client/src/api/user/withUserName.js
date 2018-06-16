import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const WithUserNameQuery = gql`
  query ($userId: Int!) {
    getUserById (userId: $userId) {
      username
    }
  }
`;

export const withUserName = graphql(WithUserNameQuery, {
  options: ({userId}) => ({
    variables: {
      userId
    }
  }),
  props: ({ownProps, data}) => {
    const user =
      data &&
      data.getUserById;

    if (!user) {
      return null;
    }

    return {
      username: user.username
    }
  }
});
