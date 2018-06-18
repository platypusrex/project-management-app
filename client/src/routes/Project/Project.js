import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { Column } from "./components/Column";
import { AddColumnButton } from "./components/AddColumnButton";
import { withProjectById } from "../../api/project/withProjectById";
import '../../styles/routes/Project.css';

const ProjectComponent = (props) => {
	const { columns, projectId } = props;

	return (
		<div className="project">
      <div className="project__card-grid">
        {columns.map(column => <Column key={column.id} column={column} projectId={projectId}/>)}

        <AddColumnButton projectId={projectId}/>
      </div>
		</div>
	);
};

ProjectComponent.propTypes = {
	projectId: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.object)
};

export const Project = compose(
	withProps(props => {
		const { projectId } = props.match.params;

		return {
			projectId: parseInt(projectId, 10)
		};
	}),
	withProjectById,
	withProps(props => {
		const { data } = props;
		const columns =
			data &&
			data.getProjectById &&
			data.getProjectById.columns;

		return {columns};
	}),
	branch((props) => props.data.loading,
		renderComponent(() => <span>Loading...</span>)
	),
)(ProjectComponent);
