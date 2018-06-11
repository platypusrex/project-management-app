import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ListItem.css';

export const ListItem = (props) => {
	const { avatarUrl, title, description, children, extra } = props;
	return (
		<div className="list-item">
			{avatarUrl &&
			<div className="list-item__avatar-wrapper">

			</div>}

			<div className="list-item__title-desc-wrapper">
				{title &&
				<h4 className="list-item__title">{title}</h4>}

				{description &&
				<span className="list-item__description">{description}</span>}
			</div>

			{children &&
			<div className="list-item__content-wrapper">
				{children}
			</div>}

			{extra &&
			<div className="list-item__extra-wrapper">
				{extra}
			</div>}
		</div>
	);
};

ListItem.propTypes = {
	avatarUrl: PropTypes.string,
	title: PropTypes.node,
	description: PropTypes.node,
	children: PropTypes.node,
	extra: PropTypes.node
};