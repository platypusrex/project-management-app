import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, lifecycle } from 'recompose';
import { Modal } from "../../../shared/components/Modal";
import { FormGroup } from "../../../shared/components/FormGroup";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { withState } from "../../../shared/containers/withState";
import { withCreateColumn } from "../../../api/column/withCreateColumn";
import { withUpdateColumnById } from "../../../api/column/withUpdateColumnById";

const initialState = {
	name: '',
	isSubmitting: false,
	errors: {},
};

const ColumnFormComponent = (props) => {
	const { column, dismiss, setState, state } = props;
	const { name } = state;

	const footer = (
		<Button type="primary" style={{marginLeft: 'auto'}} onClick={props.handleAddColumn}>
			Submit
		</Button>
	);

	return (
		<Modal
			title={!column ? 'Add Column' : `Edit Column: ${column.name}`}
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

ColumnFormComponent.propsTypes = {
	dismiss: PropTypes.func.isRequired,
	projectId: PropTypes.number.isRequired,
  column: PropTypes.object,
  columnsLength: PropTypes.number
};

export const ColumnForm = compose(
  withCreateColumn,
  withUpdateColumnById,
  withState(initialState),
	lifecycle({
    componentDidMount: function () {
      const { column, setState} = this.props;

      if (!column) {
        return;
      }

      const name = column.name || '';

      setState(ss => ({...ss, name}));
    }
  }),
	withHandlers({
		handleAddColumn: (props) => async (e) => {
			e.preventDefault();
			const { column, columnsLength, state, setState, projectId } = props;
			const { name, isSubmitting, errors } = state;

			if (isSubmitting) {
				return;
			}

			if (!column) {
        try {
          setState(ss => ({...ss, isSubmitting: true}));
          await props.createColumn({name, projectId, order: columnsLength});
          setState(ss => ({...ss, isSubmitting: false}));
          props.dismiss();
        } catch (err) {
          setState(ss => ({...ss, isSubmitting: false}));
          console.log(`handleCreateColumn: ${err}`);
        }
      } else {
        const columnPatch = {
          columnId: column.id
        };

        if (name !== column.name) {
          columnPatch.name = name;
        }

        try {
          setState(ss => ({...ss, isSubmitting: true}));
          await props.updateColumnById(columnPatch);
          setState(ss => ({...ss, isSubmitting: false}));
          props.dismiss();
        } catch (err) {
          setState(ss => ({...ss, isSubmitting: false}));
          console.log(`handleUpdateColumn: ${err}`)
        }
      }
		}
	})
)(ColumnFormComponent);
