import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { Dropdown } from "../../../shared/components/Dropdown";
import { DropdownMenu } from "../../../shared/components/DropdownMenu";
import Icon from 'react-ionicons';
import { withDeleteColumnById } from "../../../api/column/withDeleteColumnById";

const menuItems = ['Edit column', 'Delete column'];

const ColumnComponent = (props) => {
  const { column } = props;

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
    <Card
      className="project__card"
      title={column.name}
      extra={dropdown}
    />
  );
};

ColumnComponent.propTypes = {
  projectId: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired
};

export const Column = compose(
  withDeleteColumnById,
  withHandlers({
    handleMenuItemClick: (props) => (menuItem) => {
      const { column } = props;

      if (menuItem === menuItems[0]) {
        console.log(menuItem);
      }

      if (menuItem === menuItems[1]) {
        props.deleteColumnById({columnId: column.id})
      }
    }
  })
)(ColumnComponent);
