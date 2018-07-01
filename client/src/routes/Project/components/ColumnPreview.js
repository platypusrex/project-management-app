import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import { compose } from 'recompose';
import { ColumnCard } from "./ColumnCard";
import { types } from "../../../shared/constants/dragAndDrop";
import '../../../styles/routes/ColumnPreview.css';

const cardStyles = {
  border: '1px dashed #d8d8d8',
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
    WebkitTransform: transform,
    height: '75%'
  };
}

const ColumnPreviewComponent = (props) => {
  const { item, itemType, isDragging } = props;

  if (!isDragging) {
    return null;
  }

  const renderItem = (type, column) => {
    switch (type) {
      case types.COLUMN:
        return <ColumnCard column={column} style={cardStyles} setWidth={true}/>;
      default:
        return null;
    }
  };

  return (
    <div className="column-preview">
      <div style={getItemStyles(props)}>
        {renderItem(itemType, item)}
      </div>
    </div>
  );
};

ColumnPreviewComponent.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

let updates = 0;
const collect = (monitor) => {
  if (updates++ % 2 === 0) {
    return {
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    }
  }
  else {
    return {}
  }
};

export const ColumnPreview = compose(
  DragLayer(collect)
)(ColumnPreviewComponent);
