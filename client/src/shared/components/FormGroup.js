import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import '../../styles/components/FormGroup.css';

const FormGroupComponent = (props) => {
	const {children, label, feedback, optional} = props;

	return (
		<div className="form-group">
			{label &&
      <label className="form-group__label">
        {label}
        {optional && <span style={{marginLeft: '5px', color: '#999', fontSize: '11px'}}>(optional)</span>}
      </label>}

			{children}

			{feedback && <div>{feedback}</div>}
		</div>
	);
};

FormGroupComponent.propTypes = {
	children: PropTypes.node,
	label: PropTypes.string,
	feedback: PropTypes.string,
  optional: PropTypes.bool
};

export const FormGroup = compose(

)(FormGroupComponent);
