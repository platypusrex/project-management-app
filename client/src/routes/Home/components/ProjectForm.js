import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, lifecycle } from 'recompose';
import { Modal } from "../../../shared/components/Modal";
import { FormGroup } from "../../../shared/components/FormGroup";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { withState } from "../../../shared/containers/withState";
import { withCreateProject } from "../../../api/project/withCreateProject";
import { withUpdateProjectById } from "../../../api/project/withUpdateProjectById";

const initialState = {
	title: '',
	description: '',
	isSubmitting: false,
	errors: {},
};

const ProjectFormComponent = (props) => {
	const { project, dismiss, setState, state } = props;
	const { title, description } = state;

	const footer = (
		<Button style={{marginLeft: 'auto'}} onClick={props.handleSubmit}>
			Submit
		</Button>
	);

	return (
		<Modal
			title={project && project.id ? `Update ${project.title}` : 'Add Project'}
			dismiss={dismiss}
			footer={footer}
			width={450}
		>
			<FormGroup label="Project Title">
				<Input
					type="text"
					value={title}
					onChange={title => setState(ss => ({...ss, title}))}
				/>
			</FormGroup>

			<FormGroup label="Description">
				<Input
					type="text"
					value={description}
					onChange={description => setState(ss => ({...ss, description}))}
				/>
			</FormGroup>
		</Modal>
	);
};

ProjectFormComponent.propsTypes = {
	dismiss: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
	project: PropTypes.object
};

export const ProjectForm = compose(
	withState(initialState),
	withCreateProject,
	withUpdateProjectById,
	lifecycle({
		componentDidMount: function () {
			const { project, setState } = this.props;

			if (!project) {
				return;
			}

			const title = project.title || '';
			const description = project.description || '';

			setState(ss => ({...ss, title, description}))
		}
	}),
	withHandlers({
		handleSubmit: (props) => async (e) => {
			e.preventDefault();
			const { state, setState, userId, project } = props;
			const { title, description, isSubmitting, errors } = state;

			if (isSubmitting) {
				return;
			}

			if (project && project.id) {
				try {
					setState(ss => ({...ss, isSubmitting: true}));
					const projectPatch = {
						projectId: project.id
					};

					if (title !== project.title) {
						projectPatch.title = title;
					}

					if (description !== project.description) {
						projectPatch.description = description;
					}

					await props.updateProjectById(projectPatch);
					setState(ss => ({...ss, isSubmitting: false}));
					props.dismiss();
				} catch (err) {
					setState(ss => ({...ss, isSubmitting: false}));
					console.log(`handleUpdateTeam: ${err}`)
				}
			} else {
				try {
					setState(ss => ({...ss, isSubmitting: true}));
					await props.createProject({title, description, createdBy: userId});
					setState(ss => ({...ss, isSubmitting: false}));
					props.dismiss();
				} catch (err) {
					setState(ss => ({...ss, isSubmitting: false}));
					console.log(`handleCreateTeam: ${err}`);
				}
			}
		}
	})
)(ProjectFormComponent);