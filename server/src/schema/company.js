export const companyTypes = `
	type Company {
		id: Int!
		createdAt: String!
		updatedAt: String!
		name: String!
		employees: [User]
	}
	
	type Query {
		getAllCompanies: [Company]!
		getCompanyById (companyId: Int!): Company!
	}
	
	type Mutation {
		createCompany (name: String!): Company!
	}
`;