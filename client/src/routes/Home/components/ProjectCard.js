import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { ProjectForm } from "./ProjectForm";
import { EmptyList } from "../../../shared/components/EmptyList";
import { List } from "../../../shared/components/List";
import { ProjectListItem } from "./ProjectListItem";
import { withState } from "../../../shared/containers/withState";
import { emptyProjectCard } from "../../../shared/constants/homeConstants";

const initialState = {
	isAddProjectModalVisible: false,
	selectedProject: null,
};

const ProjectCardComponent = (props) => {
	const { projects, teams, userId, state } = props;

	const extra = (
		<a style={{fontSize: '12px'}} onClick={props.handleShowModal}>
			add project
		</a>
	);

	return (
		<Card title="Projects" extra={extra} bodyStyle={{padding: '0 15px'}}>
			{!projects.length &&
			<EmptyList
				title={emptyProjectCard.title}
				description={emptyProjectCard.description}
			/>}

			{!!(projects.length) &&
			<List>
				{projects.map(project => (
					<ProjectListItem
						key={project.id}
						project={project}
						editProject={project => props.handleShowModal(project)}
					/>
				))}
			</List>}

			{state.isAddProjectModalVisible &&
			<ProjectForm
				dismiss={props.handleHideModal}
				userId={userId}
				project={state.selectedProject}
        teams={teams}
			/>}
		</Card>
	);
};

ProjectCardComponent.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.object),
  teams: PropTypes.arrayOf(PropTypes.object)
};

export const ProjectCard = compose(
	withState(initialState),
	withHandlers({
		handleShowModal: (props) => (project) =>
			props.setState(ss => ({...ss, selectedProject: project || null, isAddProjectModalVisible: true})),
		handleHideModal: (props) => () =>
			props.setState(ss => ({...ss, selectedProject: null, isAddProjectModalVisible: false})),
	})
)(ProjectCardComponent);
