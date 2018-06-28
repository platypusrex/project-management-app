import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { formatDate } from "../../../shared/utils/formatData";
import '../../../styles/routes/TeamProjectCard.css';

export const TeamProjectCardComponent = (props) => {
  const { project } = props;

  return (
    <Card className="team-project-card">
      <a className="team-project-card__title" onClick={() => props.history.push(`/project/${project.id}`)}>
        {project.title}
      </a>
      <span className="team-project-card__description">{project.description}</span>


      <div className="team-project-card__details-wrapper">
        <span className="team-project-card__detail">
          <strong className="team-project-card__detail-label">Created by:</strong> {project.creator.username}
        </span>
        <span className="team-project-card__detail">
          <strong className="team-project-card__detail-label">Last updated:</strong> {formatDate(project.updatedAt)}
        </span>
      </div>
    </Card>
  );
};

TeamProjectCardComponent.propTypes = {
  project: PropTypes.object.isRequired
};

export const TeamProjectCard = compose(
  withRouter
)(TeamProjectCardComponent)
