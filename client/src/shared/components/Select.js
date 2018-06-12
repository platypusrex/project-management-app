import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withState } from "../containers/withState";
import '../../styles/components/Select.css';

const initialState = {
	isOptionsMenuOpen: false,
};

const SelectComponent = (props) => {
	const { options, optionsPrefixCls, setState, state } = props;
	const optionWrapperClass = state.isOptionsMenuOpen ?
		`${optionsPrefixCls} ${optionsPrefixCls}--open` :
		optionsPrefixCls;

	return (
		<div className="select">
			<span
				className="select__text"
				onClick={() => setState(ss => ({...ss, isOptionsMenuOpen: !ss.isOptionsMenuOpen}))}
			>
				Choose one...
			</span>
			<div className={optionWrapperClass}>
				{options.map((option, i) => (
					<div key={i} className="select__option">
						<span className="select__option__text">{option.label}</span>
					</div>
				))}
			</div>
			<select className="select__input">
				{options.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)}
			</select>
		</div>
	);
};

SelectComponent.defaultProps = {
	optionsPrefixCls: 'select__options-wrapper'
};

SelectComponent.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string
		})
	)
};

export const Select = compose(
	withState(initialState),
	withHandlers({
		handleSelectClick: (props) => () => {

		}
	})
)(SelectComponent);