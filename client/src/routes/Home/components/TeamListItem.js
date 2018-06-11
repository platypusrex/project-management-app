import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { ListItem } from "../../../shared/components/ListItem";
import { Dropdown } from "../../../shared/components/Dropdown";
import { DropdownMenu } from "../../../shared/components/DropdownMenu";
import Icon from 'react-ionicons';
import { withDeleteTeam } from "../../../api/team/withDeleteTeam";

const TeamListItemComponent = (props) => {
	const { team } = props;

	const overlay = (
		<DropdownMenu
			menuItems={['edit', 'delete']}
			onClick={(menuItem) => props.handleDropdownClick(menuItem)}
		/>
	);

	const dropdown = (
		<Dropdown overlay={overlay}>
			<Icon icon="md-more" fontSize="20px" style={{cursor: 'pointer'}}/>
		</Dropdown>
	);

	return (
		<ListItem
			title={team.name}
			description={team.description}
			extra={dropdown}
		/>
	);
};

TeamListItemComponent.propTypes = {
	team: PropTypes.object.isRequired,
	editTeam: PropTypes.func.isRequired
};

export const TeamListItem = compose(
	withDeleteTeam,
	withHandlers({
		handleDropdownClick: (props) => async (menuItem) => {
			const { team, deleteTeam, editTeam } = props;
			if (menuItem === 'delete') {
				try {
					await deleteTeam({teamId: team.id});
				} catch (err) {
					console.log(`TeamListItem: handle delete ${err}`);
				}
			}

			if (menuItem === 'edit') {
				editTeam(team);
			}
		}
	})
)(TeamListItemComponent);