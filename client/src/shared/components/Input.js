import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import '../../styles/components/Input.css';

const inputTypes = {
	text: 'text',
	number: 'number',
	email: 'email',
	password: 'password',
};

const InputComponent = (props) => {
	const {
		type,
		placeholder,
		value,
		disabled,
		required,
		onChange,
		onFocus,
		onBlur,
    style
	} = props;

	return (
		<input
			className="input"
			type={type}
			placeholder={placeholder}
			value={value}
			disabled={disabled}
			required={required}
			onChange={e => onChange(e.target.value)}
			onFocus={onFocus}
			onBlur={onBlur}
      style={style}
		/>
	);
};

InputComponent.defaultProps = {
  type: 'text'
};

InputComponent.propTypes = {
	type: PropTypes.oneOf(Object.keys(inputTypes).map(key => inputTypes[key])),
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
  style: PropTypes.object
};

export const Input = compose(

)(InputComponent);
