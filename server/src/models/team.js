export default (sequelize, DataTypes) => {
	const team = sequelize.define('Team', {
		name: DataTypes.STRING,
		description: DataTypes.TEXT('tiny')
	});

	team.associate = (models) => {
		team.belongsTo(models.User, {
			foreignKey: 'createdBy'
		});

		team.belongsToMany(models.User, {
			as: 'members',
			through: models.TeamUser,
			foreignKey: 'teamId',
			onDelete: 'CASCADE'
		});
	};

	return team;
};