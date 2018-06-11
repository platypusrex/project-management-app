import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/DropdownMenu.css';

export const DropdownMenu = (props) => {
	const { menuItems, onClick } = props;

	return (
		<div className="dropdown-menu">
			{menuItems.map((menuItem, i) => (
				<span key={i} className="dropdown-menu__item" onClick={() => onClick(menuItem)}>
					{menuItem}
				</span>
			))}
		</div>
	);
};

DropdownMenu.propTypes = {
	menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
	onClick: PropTypes.func
};