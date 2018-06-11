export default (sequelize, DataTypes) => {
	const column = sequelize.define('Column', {
		name: DataTypes.STRING
	});

	column.associate = (models) => {
		column.belongsTo(models.Project, {
			foreignKey: 'projectId'
		});

		column.hasMany(models.Task, {
			foreignKey: 'columnId'
		});
	};

	return column;
};