import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withRouter } from "react-router-dom";
import { ListItem } from "../../../shared/components/ListItem";
import { Dropdown } from "../../../shared/components/Dropdown";
import { DropdownMenu } from "../../../shared/components/DropdownMenu";
import Icon from 'react-ionicons';
import { withDeleteProject } from "../../../api/project/withDeleteProject";

const ProjectListItemComponent = (props) => {
	const { project } = props;

	const overlay = (
		<DropdownMenu
			menuItems={['edit', 'delete']}
			onClick={(menuItem) => props.handleDropdownClick(menuItem)}
		/>
	);

	const dropdown = (
		<Dropdown overlay={overlay}>
			<Icon icon="md-more" fontSize="20px" style={{cursor: 'pointer'}}/>
		</Dropdown>
	);

	return (
		<ListItem
			title={<a onClick={() => props.history.push(`/project/${project.id}`)}>{project.title}</a>}
			description={project.description}
			extra={dropdown}
		/>
	);
};

ProjectListItemComponent.propTypes = {
	project: PropTypes.object.isRequired,
	editProject: PropTypes.func.isRequired,
};

export const ProjectListItem = compose(
	withRouter,
	withDeleteProject,
	withHandlers({
		handleDropdownClick: (props) => async (menuItem) => {
			const { project, deleteProject, editProject } = props;
			if (menuItem === 'delete') {
				try {
					await deleteProject({projectId: project.id});
				} catch (err) {
					console.log(`ProjectListItem: handle delete ${err}`);
				}
			}

			if (menuItem === 'edit') {
				editProject(project);
			}
		}
	})
)(ProjectListItemComponent);