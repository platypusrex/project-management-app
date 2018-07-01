import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Card } from "../../../shared/components/Card";
import '../../../styles/routes/TeamCard.css';

const TeamCardComponent = (props) => {
  const { title, subTitle, linkUrl, children } = props;

  return (
    <Card className="team-card">
      <div className="team-card__title-wrapper">
        <a className="team-card__title" onClick={() => props.history.push(`/project/${linkUrl}`)}>
          {title}
        </a>
        <span className="team-card__description">{subTitle}</span>
      </div>

      <div className="team-card__details-wrapper">
        {children}
      </div>
    </Card>
  );
};

TeamCardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  children: PropTypes.node
};

export const TeamCard = compose(
  withRouter
)(TeamCardComponent);
