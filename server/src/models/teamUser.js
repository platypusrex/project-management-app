export default (sequelize, DataTypes) => {
	const teamUser = sequelize.define('TeamUser', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	});

	return teamUser;
};