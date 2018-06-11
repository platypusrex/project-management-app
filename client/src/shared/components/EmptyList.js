import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/EmptyList.css';

export const EmptyList = (props) => {
	const { title, description } = props;

	return (
		<div className="empty-list">
			<h3 className="empty-list__title">{title}</h3>
			<p className="empty-list__description" style={{fontSize: '14px'}}>
				{description}
			</p>
		</div>
	);
};

EmptyList.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};