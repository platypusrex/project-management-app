import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { TeamProjectCard } from "./TeamProjectCard";
import { AddProjectButton } from "./AddProjectButton";
import { SectionHeader } from "../../../shared/components/SectionHeader";
import { withProjectsByTeamId } from "../../../api/project/withProjectsByTeamId";

const TeamProjectComponent = (props) => {
  const { projects } = props;
  return (
    <div className="team-projects">
      <SectionHeader
        title="Team Projects"
        subTitle="View basic team project details here or create a new project"
      />

      <div className="grid">
        <div className="col-3_md-6_sm-12">
          <AddProjectButton/>
        </div>
        {projects.map(project => (
          <div key={project.id} className="col-3_md-6_sm-12">
            <TeamProjectCard project={project}/>
          </div>
        ))}
      </div>
    </div>
  );
};

TeamProjectComponent.propTypes = {
  teamId: PropTypes.number.isRequired
};

export const TeamProjects = compose(
  withProjectsByTeamId,
  withProps(props => {
    console.log(props);
    const { projectsData } = props;
    const projects =
      projectsData &&
      projectsData.getProjectsByTeamId || [];

    return {
      projects
    };
  }),
  branch(props => props.projectsData.loading,
    renderComponent(() => <div>Loading...</div>)
  )
)(TeamProjectComponent);
