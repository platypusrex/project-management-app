import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-ionicons';
import '../../styles/components/Select.css';

export class Select extends React.Component {
  constructor (props) {
    super(props);

    this.selectRef = React.createRef();

    this.state = {
      isOptionsMenuOpen: false,
      selectedOption: null
    };
  }

  componentDidMount () {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside = (e) => {
    if (!this.selectRef) {
      return;
    }

    if (!this.selectRef.current.contains(e.target)) {
      this.setState(ss => ({...ss, isOptionsMenuOpen: false}));
    }
  };

  handleOptionClick = (option) => {
    const { selectedOption } = this.state;

    if (Object.is(option, selectedOption)) {
      return;
    }

    this.setState(ss => ({...ss, selectedOption: option, isOptionsMenuOpen: false}))
  };

  getOptionClassName = (option) => {
    const { optionPrefixCls } = this.props;
    const { selectedOption } = this.state;

    return Object.is(option, selectedOption) ? `${optionPrefixCls} ${optionPrefixCls}--selected` : optionPrefixCls;
  };

  render () {
    const { options, placeholder, selectTextPrefixCls, optionsWrapperPrefixCls } = this.props;
    const { isOptionsMenuOpen, selectedOption } = this.state;
    const optionsWrapperClass = isOptionsMenuOpen ?
      `${optionsWrapperPrefixCls} ${optionsWrapperPrefixCls}--open` :
      optionsWrapperPrefixCls;
    const selectTextClass = isOptionsMenuOpen ?
      `${selectTextPrefixCls} ${selectTextPrefixCls}--open` :
      selectTextPrefixCls;
    const placeHolder = (selectedOption && selectedOption.label) || (placeholder || 'Choose one...');

    return (
      <div className="select" ref={this.selectRef}>
        <div
          className={selectTextClass}
          onClick={() => this.setState(ss => ({...ss, isOptionsMenuOpen: !ss.isOptionsMenuOpen}))}
        >
          <span className="select__text">{placeHolder}</span>
          <div className="select__icon-wrapper">
            <Icon icon="ios-arrow-down" fontSize="18px"/>
          </div>
        </div>
        <div className={optionsWrapperClass}>
          {options.map((option, i) => (
            <div
              key={i}
              className={this.getOptionClassName(option)}
              onClick={() => this.handleOptionClick(option)}
            >
              <span className="select__option__text">{option.label}</span>
            </div>
          ))}
        </div>
        <select className="select__input">
          {options.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)}
        </select>
      </div>
    )
  }
}

Select.defaultProps = {
  selectTextPrefixCls: 'select__text-wrapper',
	optionsWrapperPrefixCls: 'select__options-wrapper',
  optionPrefixCls: 'select__option'
};

Select.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string
		})
	),
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string
};
