import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { Column } from "./components/Column";
import { PageHeader } from "../../shared/components/PageHeader";
import { Button } from "../../shared/components/Button";
import { AddColumnButton } from "./components/AddColumnButton";
import { withProjectById } from "../../api/project/withProjectById";
import '../../styles/routes/Project.css';

const ProjectComponent = (props) => {
	const { project, columns, projectId } = props;

	return (
		<div className="project">
      <PageHeader
        title={project.title.toUpperCase()}
        subTitle={`Manage the ${project.title} project here`}
      >
        <Button>Add Task</Button>
      </PageHeader>

      <div className="project__column-grid">
        {columns.map(column => <Column key={column.id} column={column} projectId={projectId}/>)}

        <div className="project-column">
          <AddColumnButton projectId={projectId}/>
        </div>
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
		const project =
      data &&
      data.getProjectById;
		const columns =
			data &&
			data.getProjectById &&
			data.getProjectById.columns;

		return {project, columns};
	}),
	branch((props) => props.data.loading,
		renderComponent(() => <span>Loading...</span>)
	),
)(ProjectComponent);
