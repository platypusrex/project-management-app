import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LoginMutation = gql`
	mutation ($email: String!, $password: String!) {
		login (email: $email, password: $password) 
	}
`;

export const withLogin = graphql(LoginMutation, {
	props: ({ownProps, mutate}) => ({
		loginUser: async (variables) => {
			const options = {
				variables,
				mutation: LoginMutation
			};

			if (!mutate) {
				throw new Error('withLogin: missing mutate');
			}

			return mutate(options);
		}
	})
});