import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, lifecycle } from 'recompose';
import { withState } from "../../../shared/containers/withState";
import { Modal } from "../../../shared/components/Modal";
import { FormGroup } from "../../../shared/components/FormGroup";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { withCreateTeam } from "../../../api/team/withCreateTeam";
import { withUpdateTeamById } from "../../../api/team/withUpdateTeamById";

const initialState = {
	name: '',
	description: '',
	isSubmitting: '',
	errors: {}
};

const TeamFormComponent = (props) => {
	const { dismiss, state, setState } = props;
	const { name, description } = state;

	const footer = (
		<Button style={{marginLeft: 'auto'}} onClick={props.handleCreateTeam}>
			Submit
		</Button>
	);

	return (
		<Modal
			title="Add Team"
			dismiss={dismiss}
			footer={footer}
			width={450}
		>
			<FormGroup label="Team Name">
				<Input
					type="text"
					value={name}
					onChange={name => setState(ss => ({...ss, name}))}
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

TeamFormComponent.propTypes = {
	dismiss: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
	team: PropTypes.object
};

export const TeamForm = compose(
	withState(initialState),
	withCreateTeam,
	withUpdateTeamById,
	lifecycle({
		componentDidMount: function () {
			const { team, setState } = this.props;

			if (!team) {
				return;
			}

			const name = team.name || '';
			const description = team.description || '';

			setState(ss => ({...ss, name, description}));
		}
	}),
	withHandlers({
		handleCreateTeam: (props) => async (e) => {
			e.preventDefault();
			const { team, state, setState, userId } = props;
			const { name, description, isSubmitting, errors } = state;

			if (isSubmitting) {
				return;
			}

			if (team && team.id) {
				try {
					setState(ss => ({...ss, isSubmitting: true}));
					const projectPatch = {
						teamId: team.id
					};

					if (name !== team.name) {
						projectPatch.name = name;
					}

					if (description !== team.description) {
						projectPatch.description = description;
					}

					await props.updateTeamById(projectPatch);
					setState(ss => ({...ss, isSubmitting: false}));
					props.dismiss();
				} catch (err) {
					setState(ss => ({...ss, isSubmitting: false}));
					console.log(`handleUpdateTeam: ${err}`)
				}
			} else {
				try {
					setState(ss => ({...ss, isSubmitting: true}));
					await props.createTeam({name, description, createdBy: userId});
					setState(ss => ({...ss, isSubmitting: false}));
					props.dismiss();
				} catch (err) {
					setState(ss => ({...ss, isSubmitting: false}));
					console.log(`handleCreateTeam: ${err}`);
				}
			}
		}
	})
)(TeamFormComponent);