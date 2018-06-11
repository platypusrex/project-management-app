import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-ionicons';
import '../../styles/components/Modal.css';

export class Modal extends React.Component {
	constructor (props) {
		super(props);

		this.modalRef = React.createRef();
	}

	componentDidMount () {
		window.addEventListener('keyup', this.handleKeyUp, false);
		document.addEventListener('click', this.handleClickOutside, false);
	}

	componentWillUnmount () {
		window.removeEventListener('keyup', this.handleKeyUp, false);
		document.removeEventListener('click', this.handleClickOutside, false);
	}

	handleKeyUp = (e) => {
		const { dismiss } = this.props;
		const keys = {
			27: () => {
				e.preventDefault();
				dismiss();
				window.removeEventListener('keyup', this.handleKeyUp, false);
			},
		};

		if (keys[e.keyCode]) {
			keys[e.keyCode]();
		}
	};

	handleClickOutside = (e) => {
		const { dismiss } = this.props;

		if (!this.modalRef) {
			return;
		}

		if (!this.modalRef.current.contains(e.target)) {
			dismiss();
			document.removeEventListener('click', this.handleOutsideClick, false);
		}
	};

	render () {
		const { title, dismiss, children, footer, width } = this.props;

		return (
			<div className="rv-modal">

				<div className="rv-modal__dialog" ref={this.modalRef} style={{maxWidth: `${width}px`}}>
					{title &&
					<div className="rv-modal__header">
						<h3 className="rv-modal__header__title">{title}</h3>

						<div className="rv-modal__close" onClick={dismiss}>
							<Icon icon="ios-close" fontSize="35px"/>
						</div>
					</div>}

					<div className="rv-modal__body">
						{children}
					</div>

					{footer &&
					<div className="rv-modal__footer">
						{footer}
					</div>}
				</div>

			</div>
		);
	}
}

Modal.defaultProps = {
	width: 650
};

Modal.propTypes = {
	dismiss: PropTypes.func.isRequired,
	title: PropTypes.string,
	children: PropTypes.node,
	footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	width: PropTypes.number
};