import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Tab.css';

export const Tab = (props) => {
  const { title, tabKey, isActive, onClick, tabPrefixCls } = props;
  const tabClass = isActive ? `${tabPrefixCls} ${tabPrefixCls}--active` : tabPrefixCls;

  return (
    <div className={tabClass} onClick={() => onClick(tabKey)}>
      <a className="tab__link">{title}</a>
    </div>
  )
};

Tab.defaultProps = {
  tabPrefixCls: 'tab'
};

Tab.propTypes = {
  title: PropTypes.node.isRequired,
  tabKey: PropTypes.string.isRequired,
  children: PropTypes.node
};
