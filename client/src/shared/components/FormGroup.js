import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import '../../styles/components/FormGroup.css';

const FormGroupComponent = (props) => {
	const {children, label, feedback} = props;

	return (
		<div className="form-group">
			{label && <label className="form-group__label">{label}</label>}

			{children}

			{feedback && <div>{feedback}</div>}
		</div>
	);
};

FormGroupComponent.propTypes = {
	children: PropTypes.node,
	label: PropTypes.string,
	feedback: PropTypes.string
};

export const FormGroup = compose(

)(FormGroupComponent);