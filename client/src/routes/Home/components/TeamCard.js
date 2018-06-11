import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { EmptyList } from "../../../shared/components/EmptyList";
import { TeamForm } from "./TeamForm";
import { TeamListItem } from "./TeamListItem";
import { List } from "../../../shared/components/List";
import { withState } from "../../../shared/containers/withState";
import { emptyTeamList } from "../../../shared/constants/homeConstants";

const initialState = {
	isAddTeamModalVisible: false,
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
						editTeam={team => props.handleShowModal(team)}
					/>
				))}
			</List>}

			{state.isAddTeamModalVisible &&
			<TeamForm
				dismiss={props.handleHideModal}
				userId={userId}
				team={state.selectedTeam}
			/>}
		</Card>
	);
};

TeamCardComponent.propTypes = {
	teams: PropTypes.array,
	userId: PropTypes.number.isRequired
};

export const TeamCard = compose(
  withState(initialState),
	withHandlers({
		handleShowModal: (props) => (team) =>
			props.setState(ss => ({...ss, selectedTeam: team || null, isAddTeamModalVisible: true})),
		handleHideModal: (props) => () =>
			props.setState(ss => ({...ss, selectedTeam: null, isAddTeamModalVisible: false}))
	})
)(TeamCardComponent);