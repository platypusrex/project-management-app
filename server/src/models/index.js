import Sequelize from 'sequelize';
import { database, admin, password } from "../utils/config";

const sequelize = new Sequelize(database, admin, password, {
	host: 'localhost',
	dialect: 'postgres'
});

const db = {
	User: sequelize.import('./user'),
	Team: sequelize.import('./team'),
	TeamUser: sequelize.import('./teamUser'),
	Company: sequelize.import('./company'),
	Project: sequelize.import('./project'),
	ProjectUser: sequelize.import('./projectUser'),
	Column: sequelize.import('./column'),
	Task: sequelize.import('./task'),
};

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;

export default db;