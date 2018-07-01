import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, lifecycle } from 'recompose';
import { DropTarget, DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ColumnForm } from "./ColumnForm";
import { ColumnCard } from "./ColumnCard";
import { ColumnPreview } from "./ColumnPreview";
import { withState } from "../../../shared/containers/withState";
import { withDeleteColumnById } from "../../../api/column/withDeleteColumnById";
import { withUpdateColumnById } from "../../../api/column/withUpdateColumnById";
import { types } from "../../../shared/constants/dragAndDrop";
import '../../../styles/routes/Column.css';

const initialState = {
  isColumnFormVisible: false,
};

const menuItems = ['Edit column', 'Delete column'];

const ColumnComponent = (props) => {
  const {
    column,
    projectId,
    connectDropTarget,
    connectDragSource,
    isDragging,
    state,
    setState
  } = props;

  const columnCardClass = isDragging ? `project-column__card--dragging` : '';

  return connectDragSource(connectDropTarget(
    <div className="project-column">
      <ColumnCard
        className={columnCardClass}
        column={column}
        onMenuItemClick={menuItem => props.handleMenuItemClick(menuItem)}
      />
      <ColumnPreview/>

      {state.isColumnFormVisible &&
      <ColumnForm
        projectId={projectId}
        dismiss={() => setState(ss => ({...ss, isColumnFormVisible: false}))}
        column={column}
      />}
    </div>
  ));
};

ColumnComponent.propTypes = {
  projectId: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
};

const columnSource = {
  beginDrag: (props) => props.column,
  endDrag: async (props, monitor, component) => {
    if (!monitor.didDrop()) {
      return;
    }

    try {
      const { column } = props;
      const target = monitor.getDropResult();

      const draggedColumn = {
        columnId: column.id,
        order: parseInt(target.order, 10)
      };

      const droppedColumn = {
        columnId: target.columnId,
        order: parseInt(column.order, 10)
      };

      const columns = [draggedColumn, droppedColumn];

      await Promise.all(
        columns.map(column => props.updateColumnById(column))
      );

    } catch (err) {
      console.log(`UpdateColumnDragAndDrop: ${err}`);
    }
  }
};

const columnSourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

const columnTarget = {
  drop: (props, monitor, component) => {
    const { column } = props;
    const itemType = monitor.getItemType();

    switch (itemType) {
      case types.COLUMN:
        return {
          columnId: column.id,
          order: column.order
        };
      case types.TASK:
        return {
          columnId: column.id
        };
    }
  }
};

const columnTargetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  item: monitor.getItem()
});

export const Column = compose(
  withDeleteColumnById,
  withUpdateColumnById,
  DragSource(types.COLUMN, columnSource, columnSourceCollect),
  DropTarget([types.TASK, types.COLUMN], columnTarget, columnTargetCollect),
  withState(initialState),
  withHandlers({
    handleMenuItemClick: (props) => (menuItem) => {
      const { column, setState } = props;

      if (menuItem === menuItems[0]) {
        setState(ss => ({...ss, isColumnFormVisible: true}));
      }

      if (menuItem === menuItems[1]) {
        props.deleteColumnById({columnId: column.id})
      }
    }
  }),
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
)(ColumnComponent);
