import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withProps } from 'recompose';
import { Card } from "../../../shared/components/Card";
import { ProjectForm } from "./ProjectForm";
import { EmptyList } from "../../../shared/components/EmptyList";
import { List } from "../../../shared/components/List";
import { ProjectListItem } from "./ProjectListItem";
import { withState } from "../../../shared/containers/withState";
import { emptyProjectCard } from "../../../shared/constants/homeConstants";
import { withProjectsByUserId } from "../../../api/project/withProjectsByUserId";

const initialState = {
  isAddProjectModalVisible: false,
  selectedProject: null,
};

const ProjectCardComponent = (props) => {
  const { projects, userId, state } = props;

  const extra = (
    <a style={{fontSize: '12px'}} onClick={props.handleShowModal}>
      add project
    </a>
  );

  return (
    <Card title="Projects" extra={extra} bodyStyle={{padding: '0 15px'}}>
      {!projects.length &&
      <EmptyList
        title={emptyProjectCard.title}
        description={emptyProjectCard.description}
      />}

      {!!(projects.length) &&
      <List>
        {projects.map(project => (
          <ProjectListItem
            key={project.id}
            project={project}
            editProject={project => props.handleShowModalWithProject(project)}
          />
        ))}
      </List>}

      {state.isAddProjectModalVisible &&
      <ProjectForm
        dismiss={props.handleHideModal}
        userId={userId}
        project={state.selectedProject}
      />}
    </Card>
  );
};

ProjectCardComponent.propTypes = {
  userId: PropTypes.number.isRequired,
};

export const ProjectCard = compose(
  withProjectsByUserId,
  withState(initialState),
  withProps(props => {
    const { projectsData } = props;
    const projects =
      projectsData &&
      projectsData.getProjectsByUserId || [];

    return {
      projects,
    }
  }),
  withHandlers({
    handleShowModal: (props) => () => props.setState(ss => ({...ss, isAddProjectModalVisible: true})),
    handleShowModalWithProject: (props) => (project) =>
      props.setState(ss => ({...ss, selectedProject: project, isAddProjectModalVisible: true})),
    handleHideModal: (props) => () =>
      props.setState(ss => ({...ss, selectedProject: null, isAddProjectModalVisible: false})),
  })
)(ProjectCardComponent);
