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

  static getDerivedStateFromProps (props, state) {
    if (props.defaultValue && !state.selectedOption) {
      return {...state, selectedOption: props.defaultValue};
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

  handleOptionClick = (option) => {
    const { selectedOption } = this.state;

    if (Object.is(option, selectedOption)) {
      return;
    }

    this.setState(ss => ({...ss, selectedOption: option, isOptionsMenuOpen: false}));
    this.props.onChange(option.value);
  };

  getWrapperClassName = (className) => {
    return this.state.isOptionsMenuOpen ? `${className} ${className}--open` : className;
  };

  getOptionClassName = (option) => {
    const { optionPrefixCls } = this.props;
    const { selectedOption } = this.state;

    return option.value == selectedOption.value ? `${optionPrefixCls} ${optionPrefixCls}--selected` : optionPrefixCls;
  };

  getPlaceholder = () => {
    const { placeholder } = this.props;
    const { selectedOption } = this.state;

    if (!selectedOption) {
      return placeholder || 'Choose one...';
    }

    return selectedOption.label;
  };

  render () {
    const { options, selectTextPrefixCls, optionsWrapperPrefixCls } = this.props;
    const optionsWrapperClass = this.getWrapperClassName(optionsWrapperPrefixCls);
    const selectTextClass = this.getWrapperClassName(selectTextPrefixCls);
    const placeHolder = this.getPlaceholder();

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
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			label: PropTypes.string
		})
	),
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string
  }),
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};
