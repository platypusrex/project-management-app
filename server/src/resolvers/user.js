import {createToken, hashPassword, validatePassword} from "../utils/authUtil";

export const userResolvers = {
	User: {
		company: (parent, args, {models}) => models.Company.findOne({
			where: {id: parent.companyId}
		}),
	},

	Query: {
		getAllUsers: (parent, args, {models}) => models.User.findAll({
			include: [
				{
					as: 'teams',
					model: models.Team
				},
				{
					as: 'projects',
					model: models.Project
				}
			]
		}),
		getUserById: (parent, {userId}, {models}) => models.User.findOne({
			where: {id: userId},
			include: [
				{
					as: 'teams',
					model: models.Team
				},
				{
					as: 'projects',
					model: models.Project
				}
			]
		})
	},

	Mutation: {
		register: async (parent, user, {models}) => {
			user.password = await hashPassword(user.password);
			const newUser = await models.User.create(user);
			return createToken(newUser);
		},
		login: async (parent, {email, password}, {models}) => {
			const user = await models.User.findOne({ where: {email} });

			if (!user) {
				throw new Error('user not found');
			}

			const valid = validatePassword(password, user.password);

			if (!valid) {
				throw new Error('username or password is incorrect');
			}

			return createToken(user);
		},
		updateUserById: async (parent, args, {models}) => {
			const [rowsUpdated, [user]] = await models.User.update(
				args,
				{
					returning: true,
					where: {id: args.userId}
				}
			);

			return user;
		},
	}
};