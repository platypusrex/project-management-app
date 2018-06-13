export const projectResolvers = {
	Project: {
		creator: (parent, args, {models}) => models.User.findOne({
			where: {id: parent.createdBy}
		}),
		columns: (parent, args, {models}) => models.Column.findAll({
			where: {projectId: parent.id}
		}),
		team: (parent, args, {models}) => models.Team.findOne({
			where: {id: parent.teamId}
		}),
	},

	Query: {
		getAllProjects: (parent, args, {models}) => models.Project.findAll({
			include: [{
				as: 'workers',
				model: models.User
			}]
		}),
		getProjectById: (parent, {projectId}, {models}) => models.Project.findOne({
			where: {id: projectId},
			include: [{
				as: 'workers',
				model: models.User
			}]
		})
	},

	Mutation: {
		createProject: async (parent, args, {models}) => {
			try {
				const project = await models.sequelize.transaction(async () => {
					const newProject = await models.Project.create(args);
					await models.ProjectUser.create({userId: args.createdBy, projectId: newProject.id});
					await models.Column.create({projectId: newProject.id, name: 'To Do'});

					return newProject;
				});

				return project;
			} catch (err) {
				throw new Error(`createProject: ${err}`);
			}
		},
		updateProjectById: async (parent, args, {models}) => {
			const [rowsUpdated, [project]] = await models.Project.update(
				args,
				{
					returning: true,
					where: {id: args.projectId}
				}
			);

			return project;
		},
		deleteProject: (parent, {projectId}, {models}) => models.Project.destroy({
			where: {id: projectId}
		})
	}
};
