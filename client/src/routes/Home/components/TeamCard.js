import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withProps } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { EmptyList } from "../../../shared/components/EmptyList";
import { TeamForm } from "./TeamForm";
import { TeamListItem } from "./TeamListItem";
import { List } from "../../../shared/components/List";
import { withState } from "../../../shared/containers/withState";
import { emptyTeamList } from "../../../shared/constants/homeConstants";
import { withTeamsByUserId } from "../../../api/team/withTeamsByUserId";

const initialState = {
	isTeamFormVisible: false,
	selectedTeam: null,
};

const TeamCardComponent = (props) => {
	const { teams, userId, state } = props;

	const extra = (
		<a style={{fontSize: '12px'}} onClick={props.handleShowModal}>
			add team
		</a>
	);

	return (
		<Card title="Teams" extra={extra} bodyStyle={{padding: '0 15px'}}>
			{!teams.length &&
			<EmptyList
				title={emptyTeamList.title}
				description={emptyTeamList.description}
			/>}

			{!!(teams.length) &&
			<List>
				{teams.map(team => (
					<TeamListItem
						key={team.id}
						team={team}
						editTeam={team => props.handleShowModalWithTeam(team)}
					/>
				))}
			</List>}

			{state.isTeamFormVisible &&
			<TeamForm
				dismiss={props.handleHideModal}
				userId={userId}
				team={state.selectedTeam}
			/>}
		</Card>
	);
};

TeamCardComponent.propTypes = {
	userId: PropTypes.number.isRequired
};

export const TeamCard = compose(
  withTeamsByUserId,
  withState(initialState),
  withProps(props => {
    const { teamsData } = props;
    const teams =
      teamsData &&
      teamsData.getTeamsByUserId || [];

    return {
      teams,
    }
  }),
	withHandlers({
    handleShowModal: (props) => () => props.setState(ss => ({...ss, isTeamFormVisible: true})),
		handleShowModalWithTeam: (props) => (team) =>
			props.setState(ss => ({...ss, selectedTeam: team, isTeamFormVisible: true})),
		handleHideModal: (props) => () =>
			props.setState(ss => ({...ss, selectedTeam: null, isTeamFormVisible: false}))
	})
)(TeamCardComponent);
