import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Card.css';

export const Card = (props) => {
	const { children, title, extra, style, bodyStyle, className } = props;
	const cardClass = `card ${className ? className : ''}`;

	return (
		<div className={cardClass} style={style}>
			{title &&
			<div className="card__header">
				<div className="card__title">
					{title}
				</div>

				<div className="card__extra">
					{extra}
				</div>
			</div>}

			<div className="card__body" style={bodyStyle}>
				{children}
			</div>
		</div>
	);
};

Card.propTypes = {
	children: PropTypes.node,
	title: PropTypes.node,
	extra: PropTypes.node,
	style: PropTypes.object,
	bodyStyle: PropTypes.object,
	className: PropTypes.string
};