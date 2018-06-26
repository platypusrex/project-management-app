export default (sequelize, DataTypes) => {
	const team = sequelize.define('Team', {
		name: DataTypes.STRING,
		description: DataTypes.TEXT('tiny'),
    website: DataTypes.STRING,
    companyName: DataTypes.STRING
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
