import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { DragSource } from 'react-dnd';
import { Card } from "../../../shared/components/Card";
import { types } from "../../../shared/constants/dragAndDrop";
import '../../../styles/routes/Task.css';

const TaskComponent = (props) => {
  const { task, taskPrefixCls, isDragging, connectDragSource } = props;
  const taskClass = isDragging ? `${taskPrefixCls} ${taskPrefixCls}--dragging` : taskPrefixCls;

  return connectDragSource(
    <div className={taskClass}>
      <Card>
        <h5 className="task__title">{task.task}</h5>
        <span className="task__added-by">Added by <strong>{task.creator.username}</strong></span>
      </Card>
    </div>
  );
};

TaskComponent.defaultProps = {
  taskPrefixCls: 'task'
};

TaskComponent.propTypes = {
  task: PropTypes.object.isRequired,
};

const taskSource = {
  beginDrag: (props) => props.task,
  endDrag: async (props, monitor, component) => {
    if (!monitor.didDrop()) {
      return;
    }

    const { task } = props;
    const newColumnId = monitor.getDropResult().columnId;

    return props.handleDrop(task, newColumnId);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
};

export const Task = compose(
  DragSource(types.TASK, taskSource, collect)
)(TaskComponent);
