import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Tooltip } from "../../../shared/components/Tooltip";
import { Icon } from "../../../shared/components/Icon";
import { TaskForm } from "./TaskForm";
import { withState } from "../../../shared/containers/withState";
import '../../../styles/routes/AddTaskButton.css';

const initialState = {
  isTaskFormVisible: false
};

const AddTaskButtonComponent = (props) => {
  const { columnId, state, setState } = props;

  return (
    <React.Fragment>
      <Tooltip title="Add a new task">
        <div className="add-task-btn">
          <Icon
            icon="md-add"
            fontSize="22px"
            style={{cursor: 'pointer'}}
            onClick={() => setState(ss => ({...ss, isTaskFormVisible: true}))}
          />
        </div>
      </Tooltip>

      {state.isTaskFormVisible &&
      <TaskForm
        columnId={columnId}
        dismiss={() => setState(ss => ({...ss, isTaskFormVisible: false}))}
      />}
    </React.Fragment>
  );
};

AddTaskButtonComponent.propTypes = {
  columnId: PropTypes.number.isRequired
};

export const AddTaskButton = compose(
  withState(initialState),
)(AddTaskButtonComponent);
