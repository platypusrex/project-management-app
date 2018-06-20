import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

export const Icon = (props) => {
  return (
    <div className="icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Ionicon
        icon={props.icon}
        style={props.style}
        fontSize={props.fontSize}
        color={props.color}
        rotate={props.rotate}
        shake={props.shake}
        beat={props.beat}
        onClick={props.onClick}
      />
    </div>
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.object,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  rotate: PropTypes.bool,
  shake: PropTypes.bool,
  beat: PropTypes.bool,
  onClick: PropTypes.func
};
