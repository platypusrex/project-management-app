export const companyResolvers = {
	Company: {
		employees: (parent, args, {models}) => models.User.findAll({
			where: {companyId: parent.id}
		})
	},

	Query: {
		getAllCompanies: (parent, args, {models}) => models.Company.findAll(),
		getCompanyById: (parent, {companyId}, {models}) => models.Company.findOne({
			where: {id: companyId}
		})
	},

	Mutation: {
		createCompany: (parent, args, {models}) => models.Company.create(args)
	}
};