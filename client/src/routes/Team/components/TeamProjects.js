import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { AddProjectButton } from "./AddProjectButton";
import { SectionHeader } from "../../../shared/components/SectionHeader";
import { TeamCard } from "./TeamCard";
import { LabelAndDescription } from "../../../shared/components/LabelAndDescription";
import { withProjectsByTeamId } from "../../../api/project/withProjectsByTeamId";
import { formatDate } from "../../../shared/utils/formatData";

const TeamProjectComponent = (props) => {
  const { projects, teamId } = props;

  return (
    <div className="team-projects">
      <SectionHeader
        title="Team Projects"
        subTitle="View basic team project details here or create a new project"
      />

      <div className="grid">

        <div className="col-3_md-6_sm-12">
          <AddProjectButton teamId={teamId}/>
        </div>

        {projects.map(project => (
          <div key={project.id} className="col-3_md-6_sm-12">
            <TeamCard title={project.title} subTitle={project.description} linkUrl={project.id.toString()}>
              <LabelAndDescription
                label="Created by:"
                description={project.creator.username}
              />

              <LabelAndDescription
                label="Last updated:"
                description={formatDate(project.updatedAt)}
              />
            </TeamCard>
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
