import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent, withHandlers } from 'recompose';
import { Task } from "./Task";
import { withTasksByColumnId } from "../../../api/task/withTasksByColumnId";
import { withUpdateTaskById } from "../../../api/task/withUpdateTaskById";

const ColumnTasksComponent = (props) => {
  const { tasks } = props;

  return (
    <div className="column-tasks grid">
      {tasks.map(task => (
        <div key={task.id} className="col-12">
          <Task task={task} handleDrop={(task, newColumnId) => props.handleDrop(task, newColumnId)}/>
        </div>
      ))}
    </div>
  );
};

ColumnTasksComponent.propTypes = {
  columnId: PropTypes.number.isRequired
};

export const ColumnTasks = compose(
  withTasksByColumnId,
  withUpdateTaskById,
  withProps(props => {
    const { tasksData } = props;
    const tasks =
      tasksData &&
      tasksData.getTasksByColumnId || [];

    return {
      tasks
    };
  }),
  withHandlers({
    handleDrop: (props) => async (task, newColumnId) => {
      if (newColumnId === task.columnId) {
        return;
      }

      try {
        await props.updateTaskById({columnId: newColumnId, taskId: task.id});
      } catch (err) {
        console.log('err', err);
      }
    }
  }),
  branch(props => props.tasksData.loading,
    renderComponent(() => <div>Loading...</div>)
  )
)(ColumnTasksComponent);
