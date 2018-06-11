export const columnTypes = `
	type Column {
		id: Int!
		updatedAt: String!
		createdAt: String!
		name: String!
		project: Project!
		tasks: [Task]
	}
	
	type Query {
		getAllColumns: [Column]
		getColumnById (columnId: Int!): Column!
	}
	
	type Mutation {
		createColumn (projectId: Int!, name: String!): Column!
	}
`;