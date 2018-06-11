export default (sequelize, DataTypes) => {
	const company = sequelize.define('Company', {
		name: {
			unique: true,
			type: DataTypes.STRING
		}
	});

	company.associate = (models) => {
		company.hasMany(models.User, {
			foreignKey: 'companyId'
		});
	};

	return company;
}