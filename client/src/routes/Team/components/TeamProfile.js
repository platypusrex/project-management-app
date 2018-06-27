import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withHandlers } from 'recompose';
import { FormGroup } from "../../../shared/components/FormGroup";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { SectionHeader } from "../../../shared/components/SectionHeader";
import { withState } from "../../../shared/containers/withState";
import {withUpdateTeamById} from "../../../api/team/withUpdateTeamById";

const initialState = {
  name: '',
  description: '',
  website: '',
  companyName: '',
  isSubmitting: false,
  errors: {}
};

const TeamProfileComponent = (props) => {
  const { state, setState} = props;
  const { name, description, website, companyName } = state;

  return (
    <form className="team-profile" onSubmit={e => props.handleUpdateTeam(e)}>
      <div className="grid-noBottom">
        <div className="col-4_md-6_sm-10_xs-12">
          <SectionHeader title="Team Profile" subTitle="Update the team profile here"/>

          <FormGroup label="Team Name">
            <Input
              type="text"
              value={name}
              onChange={name => setState(ss => ({...ss, name}))}
            />
          </FormGroup>

          <FormGroup label="Description" optional={true}>
            <Input
              type="text"
              value={description}
              onChange={description => setState(ss => ({...ss, description}))}
            />
          </FormGroup>

          <FormGroup label="Website" optional={true}>
            <Input
              type="text"
              value={website}
              onChange={website => setState(ss => ({...ss, website}))}
            />
          </FormGroup>

          <FormGroup label="Company" optional={true}>
            <Input
              type="text"
              value={companyName}
              onChange={companyName => setState(ss => ({...ss, companyName}))}
            />
          </FormGroup>

          <div style={{display: 'flex'}}>
            <Button style={{marginRight: '20px'}} onClick={props.handleCancel}>Cancel</Button>
            <Button type="primary">Submit</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

TeamProfileComponent.propTypes = {
  team: PropTypes.object
};

function initFormState (props) {
  const { team, setState } = props;

  if (!team) {
    return;
  }

  const name = team.name || '';
  const description = team.description || '';
  const website = team.website || '';
  const companyName = team.companyName || '';

  setState(ss => ({...ss, name, description, website, companyName}));
}

export const TeamProfile = compose(
  withState(initialState),
  withUpdateTeamById,
  lifecycle({
    componentDidMount: function () {
      initFormState(this.props);
    }
  }),
  withHandlers({
    handleUpdateTeam: (props) => async (e) => {
      e.preventDefault();
      const { team, state, setState } = props;
      const { name, description, website, companyName, isSubmitting } = state;

      if (isSubmitting) {
        return;
      }

      try {
        setState(ss => ({...ss, isSubmitting: true}));
        const teamPatch = {
          teamId: team.id
        };

        if (name !== team.name) {
          teamPatch.name = name;
        }

        if (description !== team.description) {
          teamPatch.description = description;
        }

        if (website !== team.website) {
          teamPatch.website = website;
        }

        if (companyName !== team.companyName) {
          teamPatch.companyName = companyName;
        }

        await props.updateTeamById(teamPatch);
        setState(ss => ({...ss, isSubmitting: false}));
      } catch (err) {
        setState(ss => ({...ss, isSubmitting: false}));
        console.log(`handleUpdateTeam: ${err}`);
      }
    },
    handleCancel: (props) => () => {
      initFormState(props);
    }
  })
)(TeamProfileComponent);
