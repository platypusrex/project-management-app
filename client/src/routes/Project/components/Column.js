import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { Dropdown } from "../../../shared/components/Dropdown";
import { DropdownMenu } from "../../../shared/components/DropdownMenu";
import { ColumnForm } from "./ColumnForm";
import { TaskForm } from "./TaskForm";
import { Tooltip } from "../../../shared/components/Tooltip";
import { ColumnTasks } from "./ColumnTasks";
import { Icon } from "../../../shared/components/Icon";
import { withState } from "../../../shared/containers/withState";
import { withDeleteColumnById } from "../../../api/column/withDeleteColumnById";

const initialState = {
  isColumnFormVisible: false,
  isTaskFormVisible: false
};

const menuItems = ['Edit column', 'Delete column'];

const ColumnComponent = (props) => {
  const { column, projectId, state, setState } = props;

  const overlay = (
    <DropdownMenu
      menuItems={menuItems}
      onClick={(menuItem) => props.handleMenuItemClick(menuItem)}
    />
  );

  const dropdown = (
    <div style={{display: 'flex', alignItems: 'center', position: 'relative', right: '-4px'}}>
      <Tooltip title="Add a new task">
        <div className="project__add-btn" style={{margin: '0 4px'}}>
          <Icon
            icon="md-add"
            fontSize="22px"
            style={{cursor: 'pointer'}}
            onClick={() => setState(ss => ({...ss, isTaskFormVisible: true}))}
          />
        </div>
      </Tooltip>
      <Dropdown overlay={overlay}>
        <Icon icon="ios-more" fontSize="24px" style={{cursor: 'pointer'}}/>
      </Dropdown>
    </div>
  );

  return (
    <React.Fragment>
      <Card
        className="project__card"
        title={column.name}
        extra={dropdown}
      >
        <ColumnTasks columnId={column.id}/>
      </Card>

      {state.isColumnFormVisible &&
      <ColumnForm
        projectId={projectId}
        dismiss={() => setState(ss => ({...ss, isColumnFormVisible: false}))}
        column={column}
      />}

      {state.isTaskFormVisible &&
      <TaskForm
        columnId={column.id}
        dismiss={() => setState(ss => ({...ss, isTaskFormVisible: false}))}
      />}
    </React.Fragment>
  );
};

ColumnComponent.propTypes = {
  projectId: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
};

export const Column = compose(
  withDeleteColumnById,
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
    },
  })
)(ColumnComponent);
