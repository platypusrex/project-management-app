import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { Card } from "../../shared/components/Card";
import { AddColumnButton } from "./components/AddColumnButton";
import { withProjectById } from "../../api/project/withProjectById";
import '../../styles/routes/Project.css';

const ProjectComponent = (props) => {
	const { columns, projectId } = props;

	return (
		<div className="project">
			<div className="grid project__grid">
				{columns.map(column => (
					<div key={column.id} className="col-3_md-4_sm-6_xs-12">
						<Card style={{height: '100%'}}>
							{column.name}
						</Card>
					</div>
				))}

				<div className="col-3_md-4_sm-6_xs-12">
					<AddColumnButton projectId={projectId}/>
				</div>
			</div>
		</div>
	);
};

ProjectComponent.propTypes = {
	projectId: PropTypes.number
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
	)
)(ProjectComponent);
