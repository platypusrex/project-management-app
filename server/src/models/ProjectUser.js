export default (sequelize, DataTypes) => {
	const projectUser = sequelize.define('ProjectUser', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	});

	return projectUser;
}