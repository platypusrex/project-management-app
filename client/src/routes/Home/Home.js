import React from 'react';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { withUserId } from "../../shared/utils/localStorageUtil";
import { withUserById } from "../../api/user/withUserById";
import { TeamCard } from "./components/TeamCard";
import { ProjectCard } from "./components/ProjectCard";
import '../../styles/routes/Home.css';

const HomeComponent = (props) => {
	const { teams, projects, userId } = props;

	return (
		<div className="home">
			<div className="grid">
				<div className="col-3_sm-12">
					<TeamCard teams={teams} userId={userId}/>
				</div>

				<div className="col-9_sm-12">
					<ProjectCard projects={projects} userId={userId}/>
				</div>
			</div>
		</div>
	);
};

export const Home = compose(
	withUserId,
	withUserById,
	withProps((props) => {
		const { data: {getUserById}, userId } = props;
		const projects =
			getUserById &&
			getUserById.projects || [];
		const teams =
			getUserById &&
			getUserById.teams || [];

		return {
			projects,
			teams
		}
	}),
	branch((props) => props.data.loading,
		renderComponent(() => <h1>Loading...</h1>)
	)
)(HomeComponent);