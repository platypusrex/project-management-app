import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withState } from "../../../shared/containers/withState";
import { ColumnForm } from "./ColumnForm";
import '../../../styles/routes/AddColumnButton.css';

const initialState = {
	isAddColumnModalVisible: false
};

const AddColumnButtonComponent = (props) => {
	const { setState, state, projectId } = props;

	return (
		<React.Fragment>
			<div className="add-column-button" onClick={() => setState(ss => ({...ss, isAddColumnModalVisible: true}))}>
				<span>Add Column</span>
			</div>

			{state.isAddColumnModalVisible &&
			<ColumnForm
				projectId={projectId}
				dismiss={() => setState(ss => ({...ss, isAddColumnModalVisible: false}))}
			/>}
		</React.Fragment>
	);
};

AddColumnButtonComponent.propTypes = {
	projectId: PropTypes.number.isRequired
};

export const AddColumnButton = compose(
	withState(initialState),
)(AddColumnButtonComponent);
