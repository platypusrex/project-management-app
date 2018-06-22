import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Icon } from "./Icon";
import '../../styles/components/PageHeader.css';

export const PageHeaderComponent = (props) => {
  const { title, subTitle, children } = props;
  return (
    <div className="page-header">
      <div className="page-header__left">
        <div className="page-header__back-btn-wrapper">
          <Icon
            icon="md-arrow-back"
            fontSize="24px"
            style={{cursor: 'pointer'}}
            onClick={() => props.history.goBack()}
          />
        </div>

        <div className="page-header__title-wrapper">
          <h3 className="page-header__title">{title}</h3>
          <span className="page-header__sub-title">{subTitle}</span>
        </div>
      </div>

      {children &&
      <div className="page-header__extra">
        {children}
      </div>}
    </div>
  );
};

PageHeaderComponent.propTypes = {
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.node,
  children: PropTypes.node
};

export const PageHeader = compose(
  withRouter
)(PageHeaderComponent);
