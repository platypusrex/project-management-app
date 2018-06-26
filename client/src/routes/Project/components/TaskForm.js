import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Button } from "../../../shared/components/Button";
import { Modal } from "../../../shared/components/Modal";
import { FormGroup } from "../../../shared/components/FormGroup";
import { Input } from "../../../shared/components/Input";
import { withState } from "../../../shared/containers/withState";
import {withCreateTask} from "../../../api/task/withCreateTask";
import {withUserId} from "../../../shared/utils/localStorageUtil";

const initialState = {
  isSubmitting: false,
  task: ''
};

const TaskFormComponent = (props) => {
  const { dismiss, setState, state } = props;
  const { task } = state;

  const footer = (
    <Button type="primary" style={{marginLeft: 'auto'}} onClick={props.handleSubmit}>
      Submit
    </Button>
  );

  return (
    <Modal
      title="Add Task"
      dismiss={dismiss}
      footer={footer}
      width={450}
    >
      <FormGroup label="Task">
        <Input
          type="text"
          value={task}
          onChange={task => setState(ss => ({...ss, task}))}
        />
      </FormGroup>
    </Modal>
  );
};

TaskFormComponent.propTypes = {
  columnId: PropTypes.number.isRequired,
  dismiss: PropTypes.func.isRequired
};

export const TaskForm = compose(
  withState(initialState),
  withUserId,
  withCreateTask,
  withHandlers({
    handleSubmit: (props) => async (e) => {
      e.preventDefault();
      const { columnId, userId, state, setState } = props;
      const { task, isSubmitting, errors } = state;

      if (isSubmitting) {
        return;
      }

      try {
        setState(ss => ({...ss, isSubmitting: true}));
        await props.createTask({task, columnId, createdBy: userId});
        setState(ss => ({...ss, isSubmitting: false}));
        props.dismiss();
      } catch (err) {
        setState(ss => ({...ss, isSubmitting: false}));
        console.log(`handleCreateColumn: ${err}`);
      }
    }
  })
)(TaskFormComponent);
