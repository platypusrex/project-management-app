export const teamResolvers = {
	Team: {
		creator: (parent, args, {models}) => models.User.findOne({
			where: {id: parent.createdBy}
		})
	},

	Query: {
		getAllTeams: (parent, args, {models}) => models.Team.findAll(),
		getTeamById: (parent, {teamId}, {models}) => models.Team.findOne({
			where: {id: teamId}
		}),
    getTeamsByUserId: (parent, {userId}, {models}) => models.Team.findAll({
      include: [
        {
          model: models.User,
          where: { id: userId }
        }
      ]
    }, {
      raw: true
    })
	},

	Mutation: {
		createTeam: async (parent, args, {models}) => {
			try {
				const team = await models.sequelize.transaction(async () => {
					const newTeam = await models.Team.create(args);
					await models.TeamUser.create({memberId: args.createdBy, teamId: newTeam.id});

					return newTeam;
				});

				return team;
			} catch (err) {
				throw new Error(`createTeam: ${err}`);
			}
		},
		updateTeamById: async (parent, args, {models}) => {
			const [rowsUpdated, [team]] = await models.Team.update(
				args,
				{
					returning: true,
					where: {id: args.teamId}
				}
			);

			return team;
		},
		deleteTeam: (parent, {teamId}, {models}) => models.Team.destroy({
			where: {id: teamId}
		})
	}
};
