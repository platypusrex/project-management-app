import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Button.css';

export const Button = (props) => {
	const { children, onClick, disabled, style } = props;

	return (
		<button
			className="button"
			disabled={disabled}
			onClick={onClick}
			style={style}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	style: PropTypes.object,
};