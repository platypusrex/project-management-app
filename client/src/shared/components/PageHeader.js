import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/PageHeader.css';

export const PageHeader = (props) => {
  const { title, subTitle, children } = props;
  return (
    <div className="page-header">
      <div className="page-header__title-wrapper">
        <h3 className="page-header__title">{title}</h3>
        <span className="page-header__sub-title">{subTitle}</span>
      </div>

      {children &&
      <div className="page-header__extra">
        {children}
      </div>}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.node,
  children: PropTypes.node
};
