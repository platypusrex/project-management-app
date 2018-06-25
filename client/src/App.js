import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from "./shared/containers/withAuth";
import { Layout } from "./layout/Layout";
import { Login } from "./routes/Login/Login";
import { Register } from "./routes/Register/Register";
import { Home } from "./routes/Home/Home";
import { Project } from "./routes/Project/Project";
import { Team } from "./routes/Team/Team";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const AppComponent = () => {
	const appRoutes = () => (
		<Layout>
			<Switch>
				<Route path="/home" component={Home}/>
				<Route path="/project/:projectId" component={Project}/>
        <Route path="/team/:teamId" component={Team}/>
			</Switch>
		</Layout>
	);

	return (
			<Switch>
				<Route exact={true} path="/" component={Login}/>
				<Route path="/register" component={Register}/>
				<AuthContext.Consumer>
					{({isAuthenticated}) => {
						return isAuthenticated ?
							<Route component={() => appRoutes()}/> :
							<Redirect to="/"/>
					}}
				</AuthContext.Consumer>
			</Switch>
	);
};

export const App = DragDropContext(HTML5Backend)(AppComponent);

