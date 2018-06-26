import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/SectionHeader.css';

export const SectionHeader = (props) => {
  const { title, subTitle } = props;

  return (
    <div className="section-header">
      <h3 className="section-header__title">{title}</h3>
      <span className="section-header__sub-title">{subTitle}</span>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};
