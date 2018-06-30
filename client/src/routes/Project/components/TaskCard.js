import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { withState } from "../../../shared/containers/withState";
import '../../../styles/routes/TaskCard.css';

const initialState = {
  containerWidth: null
};

export const TaskCardComponent = (props) => {
  const { task, className, style, setWidth, taskPrefixCls, state } = props;
  const containerStyle = {...style, width: setWidth ? state.containerWidth : '100%'};
  const containerClass = `${taskPrefixCls} ${className}`;

  return (
    <div className={containerClass}>
      <Card style={containerStyle}>
        <h5 className="task__title">{task.task}</h5>
        <span className="task__added-by">Added by <strong>{task.creator.username}</strong></span>
      </Card>
    </div>
  );
};

TaskCardComponent.defaultProps = {
  taskPrefixCls: 'task'
};

TaskCardComponent.propTypes = {
  task: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  setWidth: PropTypes.bool
};

export const TaskCard = compose(
  withState(initialState),
  lifecycle({
    componentDidMount: function () {
      const { setState } = this.props;
      const container = document.querySelector('.task');

      if (!container) {
        return;
      }

      setState(ss => ({...ss, containerWidth: container.clientWidth}));
    }
  })
)(TaskCardComponent);
