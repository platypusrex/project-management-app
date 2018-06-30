import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/LabelAndDescription.css';

export const LabelAndDescription = (props) => {
  const { label, description } = props;

  return (
    <div className="label-and-desc">
      <div className="label-and-desc__label">
        <strong>{label}</strong>
      </div>

      <span className="label-and-desc__desc">{description}</span>
    </div>
  );
};

LabelAndDescription.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string
};
