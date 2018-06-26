export const teamTypes = `
	type Team {
		id: Int!
		createdAt: String!
		updatedAt: String!
		name: String!
		description: String
		website: String
		companyName: String
		creator: User!
	}
	
	type Query {
		getAllTeams: [Team]
		getTeamById (teamId: Int!): Team!
		getTeamsByUserId (userId: Int!): [Team]
	}
	
	type Mutation {
		createTeam (name: String!, description: String, createdBy: Int!): Team!
		updateTeamById (teamId: Int!, name: String, description: String, website: String, companyName: String): Team!
		deleteTeam (teamId: Int!): Boolean!
	}
`;
