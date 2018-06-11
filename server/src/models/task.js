export default (sequelize, DataTypes) => {
	const task = sequelize.define('Task', {
		task: DataTypes.TEXT('tiny')
	});

	task.associate = (models) => {
		task.belongsTo(models.Column, {
			foreignKey: 'columnId'
		});

		task.belongsTo(models.User, {
			foreignKey: 'createdBy'
		})
	};

	return task;
};