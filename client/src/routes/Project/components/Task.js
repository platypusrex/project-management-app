import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'
import { TaskPreview } from "./TaskPreview";
import { TaskCard } from "./TaskCard";
import { types } from "../../../shared/constants/dragAndDrop";

const TaskComponent = (props) => {
  const { task, isDragging, connectDragSource } = props;
  const taskClass = isDragging ? `task--dragging` : '';

  return connectDragSource(
    <div>
      <TaskCard task={task} className={taskClass}/>

      <TaskPreview/>
    </div>
  );
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

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

export const Task = compose(
  DragSource(types.TASK, taskSource, collect),
  lifecycle({
    componentDidMount: function () {
      const { connectDragPreview } = this.props;

      if (connectDragPreview) {
        connectDragPreview(getEmptyImage(), {
          captureDraggingState: true,
        });
      }
    }
  })
)(TaskComponent);
