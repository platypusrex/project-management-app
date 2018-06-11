import React from 'react';
import PropTypes from 'prop-types';

export const List = (props) => {
	const { header, children } = props;
	return (
		<div className="list">
			{header &&
			<div className="list__header">
				{header}
			</div>}

			{children}
		</div>
	);
};

List.propTypes = {
	header: PropTypes.node,
	children: PropTypes.node,
	bordered: PropTypes.bool
};