export default (sequelize, DataTypes) => {
	const user = sequelize.define('User', {
		username: {
			unique: true,
			type: DataTypes.STRING
		},
		email: {
			unique: true,
			type: DataTypes.STRING
		},
		password: DataTypes.STRING
	});

	user.associate = (models) => {
		user.belongsTo(models.Company, {
			foreignKey: 'companyId'
		});

		user.belongsToMany(models.Team, {
			as: 'teams',
			through: models.TeamUser,
			foreignKey: 'memberId'
		});

		user.belongsToMany(models.Project, {
			as: 'projects',
			through: models.ProjectUser,
			foreignKey: 'userId'
		});
	};

	return user;
}