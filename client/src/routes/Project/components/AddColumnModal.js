import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Modal } from "../../../shared/components/Modal";
import { FormGroup } from "../../../shared/components/FormGroup";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { withState } from "../../../shared/containers/withState";
import { withCreateColumn } from "../../../api/column/withCreateColumn";

const initialState = {
	name: '',
	isSubmitting: false,
	errors: {},
};

const AddColumnModalComponent = (props) => {
	const { dismiss, setState, state } = props;
	const { name } = state;

	const footer = (
		<Button style={{marginLeft: 'auto'}} onClick={props.handleAddColumn}>
			Submit
		</Button>
	);

	return (
		<Modal
			title="Add Column"
			dismiss={dismiss}
			footer={footer}
			width={450}
		>
			<FormGroup label="Column Name">
				<Input
					type="text"
					value={name}
					onChange={name => setState(ss => ({...ss, name}))}
				/>
			</FormGroup>
		</Modal>
	);
};

AddColumnModalComponent.propsTypes = {
	dismiss: PropTypes.func.isRequired,
	projectId: PropTypes.number.isRequired
};

export const AddColumnModal = compose(
	withState(initialState),
	withCreateColumn,
	withHandlers({
		handleAddColumn: (props) => async (e) => {
			e.preventDefault();
			const { state, setState, projectId } = props;
			const { name, isSubmitting, errors } = state;

			if (isSubmitting) {
				return;
			}

			try {
				setState(ss => ({...ss, isSubmitting: true}));
				const response = await props.createColumn({name, projectId});
				console.log(response);
				setState(ss => ({...ss, isSubmitting: false}));
				props.dismiss();
			} catch (err) {
				setState(ss => ({...ss, isSubmitting: false}));
				console.log(`handleCreateTeam: ${err}`);
			}
		}
	})
)(AddColumnModalComponent);