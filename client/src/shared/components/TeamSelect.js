import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { FormGroup } from "./FormGroup";
import { Select } from "./Select";
import { withUserId}  from "../utils/localStorageUtil";
import { withTeamsByUserId } from "../../api/team/withTeamsByUserId";

const TeamSelectComponent = (props) => {
  const { teamOptions, defaultValue, onChange } = props;

  if (!teamOptions.length) {
    return null;
  }

  return (
    <FormGroup label="Team">
      <Select
        options={teamOptions}
        placeholder="Select team"
        defaultValue={defaultValue}
        onChange={teamId => onChange(teamId)}
        canClear
      />
    </FormGroup>
  );
};

TeamSelectComponent.propTypes = {
  defaultValue: PropTypes.number,
  onChange: PropTypes.func
};

export const TeamSelect = compose(
  withUserId,
  withTeamsByUserId,
  withProps(props => {
    const { teamsData } = props;
    const teamOptions =
      teamsData &&
      teamsData.getTeamsByUserId &&
      teamsData.getTeamsByUserId
        .map(team => ({value: team.id, label: team.name})) || [];

    return {
      teamOptions
    };
  })
)(TeamSelectComponent);
