export const userTypes = `
	type User {
		id: Int!
		createdAt: String!
		updatedAt: String!
		username: String!
		email: String!
		password: String!
		company: Company,
		teams: [Team]!
		projects: [Project]!
	}
	
	type Query {
		getAllUsers: [User]
		getUserById (userId: Int!): User!
	}
	
	type Mutation {
		register (username: String!, email: String!, password: String!): String!
		login (email: String!, password: String!): String!,
		updateUserById (userId: Int!, username: String, email: String, companyId: Int): User!
	}
`;