import React from 'react';
import { compose } from 'recompose';
import { withUserId } from "../../shared/utils/localStorageUtil";
import { TeamCard } from "./components/TeamCard";
import { ProjectCard } from "./components/ProjectCard";
import '../../styles/routes/Home.css';

const HomeComponent = (props) => {
	const { userId } = props;

	return (
		<div className="home">
			<div className="grid">
				<div className="col-3_sm-12">
					<TeamCard userId={userId}/>
				</div>

				<div className="col-9_sm-12">
					<ProjectCard userId={userId}/>
				</div>
			</div>
		</div>
	);
};

export const Home = compose(
	withUserId,
)(HomeComponent);
