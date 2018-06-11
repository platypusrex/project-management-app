import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/layout/Content.css';

export const Content = (props) => (
	<div className="content">
		{props.children}
	</div>
);

Content.propTypes = {
	children: PropTypes.node
};