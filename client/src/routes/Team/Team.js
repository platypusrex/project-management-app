import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { PageHeader } from "../../shared/components/PageHeader";
import { withTeamById } from "../../api/team/withTeamById";
import '../../styles/routes/Team.css';

const TeamComponent = (props) => {
  const { team } = props;

  return (
    <div className="team">
      <PageHeader title={team.name} subTitle={`Manage the ${team.name} team here`}/>
    </div>
  );
};

TeamComponent.propTypes = {
  teamId: PropTypes.number.isRequired,
};

export const Team = compose(
  withProps(props => {
    const { teamId } = props.match.params;

    return {
      teamId: parseInt(teamId, 10)
    };
  }),
  withTeamById,
  withProps(props => {
    const { teamData } = props;
    const team =
      teamData &&
      teamData.getTeamById || [];

    return {
      team,
    };
  }),
  branch(props => props.teamData.loading,
    renderComponent(() => <div>Loading...</div>)
  )
)(TeamComponent);
