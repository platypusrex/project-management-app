import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { DragSource } from 'react-dnd';
import { Card } from "../../../shared/components/Card";
import { types } from "../../../shared/constants/dragAndDrop";

const cardSource = {
  beginDrag: (props) => props.task,
  endDrag: (props, monitor, component) => {
    if (!monitor.didDrop()) {
      return;
    }

    return props.handleDrop(props.task.id);
  }
};

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

const TaskComponent = (props) => {
  const { task, isDragging, connectDragSource } = props;

  return connectDragSource(
    <div className="task">
      <Card>
        <h5 style={{margin: '0 0 5px'}}>{task.task}</h5>
        <span style={{fontSize: '11px'}}>Added by <strong>{task.creator.username}</strong></span>
      </Card>
    </div>
  );
};

TaskComponent.propTypes = {
  task: PropTypes.object.isRequired
};

export const Task = compose(
  DragSource(types.TASK, cardSource, collect)
)(TaskComponent);
