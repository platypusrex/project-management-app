import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Tooltip } from "../../../shared/components/Tooltip";
import { Icon } from "../../../shared/components/Icon";
import { withCreateTask } from "../../../api/task/withCreateTask";
import { withState } from "../../../shared/containers/withState";

const initialState = {
  isTaskFormVisible: false
  isSubmitting: false,
  task: ''
};

const AddTaskButtonComponent = (props) => {
  return (
    <React.Fragment>
      <Tooltip title="Add a new task">
        <div className="project__add-btn" style={{margin: '0 4px'}}>
          <Icon icon="md-add" fontSize="22px" style={{cursor: 'pointer'}}/>
        </div>
      </Tooltip>


    </React.Fragment>
  );
};

export const AddTaskButton = compose(
  withState(initialState),
  withCreateTask,
  withHandlers({
    handleCreateTask: (props) => () => {

    }
  })
)(AddTaskButtonComponent);
