import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const RegisterMutation = gql`
	mutation ($username: String!, $email: String!, $password: String!) {
		register (username: $username, email: $email, password: $password)
	}	
`;

export const withRegister = graphql(RegisterMutation, {
	props: ({ownProps, mutate}) => ({
		registerUser: (variables) => {
			const options = {
				variables,
				mutation: RegisterMutation
			};

			if (!mutate) {
				throw new Error('withRegister: missing mutate');
			}

			return mutate(options);
		}
	})
});