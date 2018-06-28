import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withHandlers } from 'recompose';
import { withState } from "../containers/withState";
import '../../styles/components/Tooltip.css';

const initialState = {
  isTooltipVisible: false,
  tooltipStyle: {}
};

const positions = {
  left: 'left',
  right: 'right',
};

const TooltipComponent = (props) => {
  const { children, title, state } = props;
  const tooltipClass = getTooltipWrapperClass(props);

  return (
    <div
      className="tooltip"
      onMouseOver={e => props.handleMouseOver(e)}
      onMouseOut={e => props.handleMouseOut(e)}
    >
      {children}

      <div className={tooltipClass} style={state.tooltipStyle}>
        <span className="tooltip__title">{title}</span>
      </div>
    </div>
  );
};

TooltipComponent.defaultProps = {
  toolTipPrefixCls: 'tooltip__wrapper'
};

TooltipComponent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  position: PropTypes.oneOf(Object.keys(positions).map(key => positions[key]))
};

function getTooltipWrapperClass (props) {
  const { position, toolTipPrefixCls, state } = props;
  const toolTipClass = `${toolTipPrefixCls} ${getTooltipPositionClass(position, toolTipPrefixCls)}`;

  return state.isTooltipVisible ? `${toolTipPrefixCls}--visible ${toolTipClass}` : toolTipClass;
}

function getTooltipPositionClass (position, prefix) {
  switch (position) {
    case positions.left:
      return `${prefix}--${positions.left}`;
    case positions.right:
      return `${prefix}--${positions.right}`;
    default:
      return `${prefix}--${positions.left}`;
  }
}

export const Tooltip = compose(
  withState(initialState),
  lifecycle({
    componentDidMount: function () {
      const { setState } = this.props;
      const tooltip = document.querySelector('.tooltip__wrapper');

      setState(ss => ({
        ...ss,
        tooltipStyle: {marginBottom: `-${tooltip.clientHeight / 2}px`}
      }));
    }
  }),
  withHandlers({
    handleMouseOver: (props) => (e) => {
      const { setState } = props;

      e.stopPropagation();

      setState(ss => ({...ss, isTooltipVisible: true}))
    },
    handleMouseOut: (props) => (e) => {
      const { setState } = props;

      e.stopPropagation();

      setState(ss => ({...ss, isTooltipVisible: false}))
    }
  })
)(TooltipComponent);
