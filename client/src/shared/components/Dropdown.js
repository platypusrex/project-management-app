import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Dropdown.css';

export class Dropdown extends React.Component {
	constructor (props) {
		super(props);

		this.dropdownRef = React.createRef();

		this.state = {
			isMenuVisible: false
		}
	}

	componentDidMount () {
		document.addEventListener('click', this.handleClickOutside, false);
	}

	componentWillUnmount () {
		document.removeEventListener('click', this.handleClickOutside, false);
	}

	handleClickOutside = (e) => {
		if (!this.dropdownRef) {
			return;
		}

		if (!this.dropdownRef.current.contains(e.target)) {
			this.setState(ss => ({...ss, isMenuVisible: false}));
		}
	};

	render () {
		const { children, overlay, prefixCls } = this.props;
		const { isMenuVisible } = this.state;
		const menuWrapperClass = isMenuVisible ? `${prefixCls} ${prefixCls}--open` : prefixCls;

		return (
			<div
				className="dropdown"
				onClick={() => this.setState(ss => ({...ss, isMenuVisible: !ss.isMenuVisible}))}
				ref={this.dropdownRef}
			>
				{children}
				<div className={menuWrapperClass}>
					{overlay}
				</div>
			</div>
		);
	}
}

Dropdown.defaultProps = {
	prefixCls: 'dropdown__menu-wrapper'
};

Dropdown.propTypes = {
	children: PropTypes.node,
	overlay: PropTypes.node
};
