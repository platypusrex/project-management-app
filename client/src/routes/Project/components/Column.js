import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { Dropdown } from "../../../shared/components/Dropdown";
import { DropdownMenu } from "../../../shared/components/DropdownMenu";
import { ColumnForm } from "./ColumnForm";
import Icon from 'react-ionicons';
import { withDeleteColumnById } from "../../../api/column/withDeleteColumnById";
import { withState } from "../../../shared/containers/withState";

const initialState = {
  isColumnFormVisible: false
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
    <Dropdown overlay={overlay}>
      <Icon icon="md-more" fontSize="22px" style={{cursor: 'pointer'}}/>
    </Dropdown>
  );

  return (
    <React.Fragment>
      <Card
        className="project__card"
        title={column.name}
        extra={dropdown}
      />

      {state.isColumnFormVisible &&
      <ColumnForm
        projectId={projectId}
        dismiss={() => setState(ss => ({...ss, isColumnFormVisible: false}))}
        column={column}
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
    }
  })
)(ColumnComponent);
