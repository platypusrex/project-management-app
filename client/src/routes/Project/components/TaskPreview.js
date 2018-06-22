import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import { compose } from 'recompose';
import { TaskCard } from "./TaskCard";
import { types } from "../../../shared/constants/dragAndDrop";

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: 'auto',
  height: '100%',
  transform: 'rotate(2.5deg)',
};

const cardStyles = {
  background: '#e6f7ff',
  border: '1px solid cornflowerblue'
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

const TaskPreviewComponent = (props) => {
  const { item, itemType, isDragging } = props;

  if (!isDragging) {
    return null;
  }

  const renderItem = (type, task) => {
    switch (type) {
      case types.TASK:
        return (
          <TaskCard task={task} className="task" style={cardStyles} setWidth={true}/>
        );
    }
  };

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>
        {renderItem(itemType, item)}
      </div>
    </div>
  );
};

TaskPreviewComponent.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

const collect = (monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
});

export const TaskPreview = compose(
  DragLayer(collect)
)(TaskPreviewComponent);
