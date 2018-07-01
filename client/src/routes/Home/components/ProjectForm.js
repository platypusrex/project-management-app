import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, lifecycle } from 'recompose';
import { Modal } from "../../../shared/components/Modal";
import { FormGroup } from "../../../shared/components/FormGroup";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { TeamSelect } from "../../../shared/components/TeamSelect";
import { withState } from "../../../shared/containers/withState";
import {createProject, withCreateProject} from "../../../api/project/withCreateProject";
import { withUpdateProjectById } from "../../../api/project/withUpdateProjectById";

const initialState = {
	title: '',
	description: '',
  teamId: null,
	isSubmitting: false,
	errors: {},
};

const ProjectFormComponent = (props) => {
	const { project, dismiss, setState, state } = props;
	const { title, description } = state;

	const footer = (
		<Button type="primary" style={{marginLeft: 'auto'}} onClick={props.handleSubmit}>
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
			<FormGroup label="Project Title*">
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

      <TeamSelect
        defaultValue={state.teamId}
        onChange={teamId => setState(ss => ({...ss, teamId}))}
      />
		</Modal>
	);
};

ProjectFormComponent.propsTypes = {
	dismiss: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
  teamId: PropTypes.number,
	project: PropTypes.object,
};

export const ProjectForm = compose(
	withState(initialState),
	withCreateProject,
	withUpdateProjectById,
	lifecycle({
		componentDidMount: function () {
			const { project, setState, teamId } = this.props;

			if (teamId) {
			  setState(ss => ({...ss, teamId}))
      }

			if (!project) {
				return;
			}

			const title = project.title || '';
			const description = project.description || '';
			const projectTeamId = project.team ? project.team.id : null;

			setState(ss => ({...ss, title, description, teamId: projectTeamId}));
		}
	}),
	withHandlers({
		handleSubmit: (props) => async (e) => {
			e.preventDefault();
			const { state, setState, userId, project } = props;
			const { title, description, teamId, isSubmitting, errors } = state;

			if (isSubmitting) {
				return;
			}

			if (!project) {
        try {
          setState(ss => ({...ss, isSubmitting: true}));
          await createProject({title, description, teamId, createdBy: userId}, !!(props.teamId));
          setState(ss => ({...ss, isSubmitting: false}));
          props.dismiss();
        } catch (err) {
          setState(ss => ({...ss, isSubmitting: false}));
          console.log(`handleCreateTeam: ${err}`);
        }
			} else {
        try {
          setState(ss => ({...ss, isSubmitting: true}));
          const currentTeamId = project.team && project.team.id;
          const projectPatch = {
            projectId: project.id,
          };

          if (title !== project.title) {
            projectPatch.title = title;
          }

          if (description !== project.description) {
            projectPatch.description = description;
          }

          if (teamId !== currentTeamId) {
            projectPatch.teamId = teamId;
          }

          await props.updateProjectById(projectPatch);
          setState(ss => ({...ss, isSubmitting: false}));
          props.dismiss();
        } catch (err) {
          setState(ss => ({...ss, isSubmitting: false}));
          console.log(`handleUpdateTeam: ${err}`)
        }
			}
		}
	})
)(ProjectFormComponent);
