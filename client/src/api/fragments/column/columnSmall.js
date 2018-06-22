import gql from 'graphql-tag';

export const ColumnSmallFragment = gql`
  fragment ColumnSmall on Column {
    id 
    name
  }
`;
