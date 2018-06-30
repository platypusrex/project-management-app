export const columnTypes = `
	type Column {
		id: Int!
		updatedAt: String!
		createdAt: String!
		name: String!
		order: Int!
		project: Project!
		tasks: [Task]
	}
	
	type Query {
		getAllColumns: [Column]
		getColumnById (columnId: Int!): Column!
	}
	
	type Mutation {
		createColumn (projectId: Int!, name: String!, order: Int!): Column!
		updateColumnById (columnId: Int!, name: String, order: Int): Column!
		deleteColumnById (columnId: Int!): Boolean!
	}
`;
