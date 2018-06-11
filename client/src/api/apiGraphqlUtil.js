import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';

const httpLink = new HttpLink({
	uri: 'http://localhost:8000/graphql',
});

export const apolloClient = new ApolloClient({
	link: ApolloLink.from([
		onError(({graphQLErrors, networkError}) => {
			if (graphQLErrors) {
				graphQLErrors.map(({message, locations, path}) =>
					console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
			}

			if (networkError) {
				console.log(`[Network error]: ${networkError}`);
			}
		}),
		httpLink
	]),
	cache: new InMemoryCache()
});