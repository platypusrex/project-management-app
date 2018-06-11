import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { AuthProvider } from "./shared/containers/withAuth";
import { apolloClient } from "./api/apiGraphqlUtil";
import 'typeface-oxygen';
import 'typeface-open-sans';
import 'gridlex';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<ApolloProvider client={apolloClient}>
		<Router>
			<Switch>
				<AuthProvider>
					<App />
				</AuthProvider>
			</Switch>
		</Router>
	</ApolloProvider>
	,
	document.getElementById('root')
);
registerServiceWorker();
