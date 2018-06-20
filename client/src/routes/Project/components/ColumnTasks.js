import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { withTasksByColumnId } from "../../../api/task/withTasksByColumnId";

const ColumnTasksComponent = (props) => {
  const { tasks } = props;

  return (
    <div className="column-tasks grid">
      {tasks.map(task => (
        <div key={task.id} className="col-12">
          <Card>
            <h5 style={{margin: '0 0 5px'}}>{task.task}</h5>
            <span style={{fontSize: '11px'}}>Added by <strong>{task.creator.username}</strong></span>
          </Card>
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
  withProps(props => {
    const { tasksData } = props;
    const tasks =
      tasksData &&
      tasksData.getTasksByColumnId || [];

    return {
      tasks
    };
  }),
  branch(props => props.tasksData.loading,
    renderComponent(() => <div>Loading...</div>)
  )
)(ColumnTasksComponent);
