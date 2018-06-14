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
      selectedValue: null
    };
  }

  static getDerivedStateFromProps (props, state) {
    if (props.defaultValue && !state.selectedValue) {
      return {...state, selectedValue: props.defaultValue};
    }

    return state;
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

  handleOptionClick = (value) => {
    const { selectedValue } = this.state;

    if (value === selectedValue) {
      return;
    }

    this.setState(ss => ({...ss, selectedValue: value, isOptionsMenuOpen: false}));
    this.props.onChange(value);
  };

  getWrapperClassName = (className) => {
    return this.state.isOptionsMenuOpen ? `${className} ${className}--open` : className;
  };

  getOptionClassName = (value) => {
    const { optionPrefixCls } = this.props;
    const { selectedValue } = this.state;

    if (!selectedValue) {
      return optionPrefixCls;
    }

    return value === selectedValue ? `${optionPrefixCls} ${optionPrefixCls}--selected` : optionPrefixCls;
  };

  getPlaceholder = () => {
    const { placeholder, options } = this.props;
    const { selectedValue } = this.state;

    if (!selectedValue) {
      return placeholder || 'Choose one...';
    }

    return options.find(option => option.value === selectedValue).label;
  };

  handleClickSelect = (e) => {
    if (e.target.parentNode.classList.contains('select__clear-wrapper')) {
      return;
    }

    this.setState(ss => ({...ss, isOptionsMenuOpen: !ss.isOptionsMenuOpen}));
  };

  handleClearSelectedValue = () => {
    if (!this.state.selectedValue) {
      return;
    }

    this.setState(ss => ({...ss, selectedValue: null}));
    this.props.onChange(null);
  };

  render () {
    const { options, canClear, selectTextPrefixCls, optionsWrapperPrefixCls } = this.props;
    const optionsWrapperClass = this.getWrapperClassName(optionsWrapperPrefixCls);
    const selectTextClass = this.getWrapperClassName(selectTextPrefixCls);
    const placeHolder = this.getPlaceholder();

    return (
      <div className="select" ref={this.selectRef}>
        <div
          className={selectTextClass}
          onClick={this.handleClickSelect}
        >
          <span className="select__text">{placeHolder}</span>

          {canClear &&
          <div className="select__clear-wrapper" onClick={this.handleClearSelectedValue}>
            <Icon icon="ios-close-circle-outline" fontSize="18px"/>
          </div>}

          <div className="select__icon-wrapper">
            <Icon icon="ios-arrow-down" fontSize="18px"/>
          </div>
        </div>
        <div className={optionsWrapperClass}>
          {options.map((option, i) => (
            <div
              key={i}
              className={this.getOptionClassName(option.value)}
              onClick={() => this.handleOptionClick(option.value)}
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
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			label: PropTypes.string
		})
	),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  canClear: PropTypes.bool,
  onChange: PropTypes.func
};
