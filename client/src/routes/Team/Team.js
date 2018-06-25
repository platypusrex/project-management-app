import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { PageHeader } from "../../shared/components/PageHeader";
import { Tabs } from "../../shared/components/Tabs";
import { Tab } from "../../shared/components/Tab";
import { withTeamById } from "../../api/team/withTeamById";
import '../../styles/routes/Team.css';

const TeamComponent = (props) => {
  const { team } = props;

  return (
    <div className="team">
      <PageHeader title={team.name} subTitle={`Manage the ${team.name} team here`}/>

      <Tabs defaultActiveKey="profile" isTabCard={true}>
        <Tab title="Profile" tabKey="profile">
          I'm in profile
        </Tab>
        <Tab title="Boards" tabKey="boards">
          I'm in boards
        </Tab>
        <Tab title="Members" tabKey="members">
          I'm in members
        </Tab>
      </Tabs>
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
