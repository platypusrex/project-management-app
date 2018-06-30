export default (sequelize, DataTypes) => {
	const column = sequelize.define('Column', {
		name: DataTypes.STRING,
    order: DataTypes.INTEGER
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
