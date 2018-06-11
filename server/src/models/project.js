export default (sequelize, DataTypes) => {
	const project = sequelize.define('Project', {
		title: DataTypes.STRING,
		description: DataTypes.TEXT('tiny')
	});

	project.associate = (models) => {
		project.belongsTo(models.User, {
			foreignKey: 'createdBy'
		});

		project.belongsTo(models.Team, {
			foreignKey: 'teamId'
		});

		project.belongsToMany(models.User, {
			as: 'workers',
			through: models.ProjectUser,
			foreignKey: 'projectId',
			onDelete: 'CASCADE'
		});

		project.hasMany(models.Column, {
			foreignKey: 'projectId'
		});
	};

	return project;
}