import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { ColumnTasks } from "./ColumnTasks";
import { DropdownMenu } from "../../../shared/components/DropdownMenu";
import { AddTaskButton } from "./AddTaskButton";
import { Dropdown } from "../../../shared/components/Dropdown";
import { Icon } from "../../../shared/components/Icon";
import { withState } from "../../../shared/containers/withState";
import '../../../styles/routes/Column.css';

const menuItems = ['Edit column', 'Delete column'];
const initialState = {
  containerWidth: null,
};

const ColumnCardComponent = (props) => {
  const { column, onMenuItemClick, style, setWidth, className, prefixCls, state } = props;
  const styles = {...style, width: setWidth ? state.containerWidth : null};
  const columnCardClass = `${prefixCls} ${className}`;

  const overlay = (
    <DropdownMenu
      menuItems={menuItems}
      onClick={menuItem => onMenuItemClick(menuItem)}
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

  return (
    <Card
      className={columnCardClass}
      title={column.name} extra={dropdown}
      style={styles}
    >
      <ColumnTasks columnId={column.id}/>
    </Card>
  );
};

ColumnCardComponent.defaultProps = {
  prefixCls: 'project-column__card'
};

ColumnCardComponent.propTypes = {
  column: PropTypes.object.isRequired,
  onMenuItemClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  setWidth: PropTypes.bool
};

export const ColumnCard = compose(
  withState(initialState),
  lifecycle({
    componentDidMount: function () {
      const { setState } = this.props;
      const container = document.querySelector('.project-column__card');

      if (!container) {
        return;
      }

      setState(ss => ({...ss, containerWidth: container.clientWidth,}))
    }
  })
)(ColumnCardComponent);
