import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { DropTarget } from 'react-dnd';
import { Card } from "../../../shared/components/Card";
import { Dropdown } from "../../../shared/components/Dropdown";
import { DropdownMenu } from "../../../shared/components/DropdownMenu";
import { ColumnForm } from "./ColumnForm";
import { ColumnTasks } from "./ColumnTasks";
import { AddTaskButton } from "./AddTaskButton";
import { Icon } from "../../../shared/components/Icon";
import { withState } from "../../../shared/containers/withState";
import { withDeleteColumnById } from "../../../api/column/withDeleteColumnById";
import { types } from "../../../shared/constants/dragAndDrop";
import '../../../styles/routes/Column.css';

const initialState = {
  isColumnFormVisible: false,
};

const menuItems = ['Edit column', 'Delete column'];

const ColumnComponent = (props) => {
  const { column, projectId, connectDropTarget, state, setState } = props;

  const overlay = (
    <DropdownMenu
      menuItems={menuItems}
      onClick={(menuItem) => props.handleMenuItemClick(menuItem)}
    />
  );

  const dropdown = (
    <div className="project-column__card__dropdown">
      <AddTaskButton columnId={column.id}/>

      <Dropdown overlay={overlay}>
        <Icon icon="ios-more" fontSize="24px" style={{cursor: 'pointer'}}/>
      </Dropdown>
    </div>
  );

  return connectDropTarget(
    <div className="project-column">
      <Card className="project-column__card" title={column.name} extra={dropdown}>
        <ColumnTasks columnId={column.id}/>
      </Card>

      {state.isColumnFormVisible &&
      <ColumnForm
        projectId={projectId}
        dismiss={() => setState(ss => ({...ss, isColumnFormVisible: false}))}
        column={column}
      />}
    </div>
  );
};

ColumnComponent.propTypes = {
  projectId: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
};

const columnTarget = {
  drop: (props, monitor, component) => {
    const { column } = props;
    // const task = monitor.getItem();

    // if (column.id === task.columnId) {
    //   return;
    // }

    return {
      columnId: column.id
    };
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  item: monitor.getItem()
});

export const Column = compose(
  withDeleteColumnById,
  DropTarget(types.TASK, columnTarget, collect),
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
  })
)(ColumnComponent);
