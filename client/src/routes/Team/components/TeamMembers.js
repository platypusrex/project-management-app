import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { SectionHeader } from "../../../shared/components/SectionHeader";
import { TeamCard } from './TeamCard';
import { LabelAndDescription } from "../../../shared/components/LabelAndDescription";
import { withUsersByTeamId } from "../../../api/user/withUsersByTeamId";
import { formatDate } from "../../../shared/utils/formatData";

const TeamMembersComponent = (props) => {
  const { members } = props;

  return (
    <div className="team-members">
      <SectionHeader
        title="Team Members"
        subTitle="View and edit team members here"
      />
      <div className="grid">
        {members.map(member => (
          <div className="col-3_md-6_sm-12">
            <TeamCard title={member.username} subTitle={member.email}>
              <LabelAndDescription
                label="Created on:"
                description={formatDate(member.createdAt)}
              />

              <LabelAndDescription
                label="Last updated:"
                description={formatDate(member.updatedAt)}
              />
            </TeamCard>
          </div>
        ))}
      </div>
    </div>
  );
};

TeamMembersComponent.propTypes = {
  teamId: PropTypes.number.isRequired,
  creator: PropTypes.number.isRequired
};

export const TeamMembers = compose(
  withUsersByTeamId,
  withProps(props => {
    const { usersData } = props;
    const members =
      usersData &&
      usersData.getUsersByTeamId || [];

    return {
      members
    };
  })
)(TeamMembersComponent);
