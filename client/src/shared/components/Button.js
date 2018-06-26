import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Button.css';

const buttonTypes = {
  default: 'default',
  primary: 'primary',
  danger: 'danger'
};

export const Button = (props) => {
	const { children, onClick, disabled, style } = props;
	const buttonClass = getButtonClass(props);

	return (
		<button
			className={buttonClass}
			disabled={disabled}
			onClick={onClick}
			style={style}
		>
			{children}
		</button>
	);
};

Button.defaultProps = {
  buttonPrefixCls: 'button'
};

Button.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	style: PropTypes.object,
  type: PropTypes.oneOf(Object.keys(buttonTypes).map(key => buttonTypes[key]))
};

function getButtonClass (props) {
  const { type, buttonPrefixCls } = props;

  switch (type) {
    case buttonTypes.default:
      return `${buttonPrefixCls} ${buttonPrefixCls}--default`;
    case buttonTypes.primary:
      return `${buttonPrefixCls} ${buttonPrefixCls}--primary`;
    case buttonTypes.danger:
      return `${buttonPrefixCls} ${buttonPrefixCls}--danger`;
    default:
      return `${buttonPrefixCls} ${buttonPrefixCls}--default`;
  }
}
