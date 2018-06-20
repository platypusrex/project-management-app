export const taskTypes = `
	type Task {
		id: Int!
		createdAt: String!
		updatedAt: String!
		task: String!
		column: Column!
		creator: User!
	}
	
	type Query {
		getAllTasks: [Task]!
		getTaskById (taskId: Int!): Task!
		getTasksByColumnId (columnId: Int!): [Task]
	}
	
	type Mutation {
		createTask (task: String!, columnId: Int!, createdBy: Int!): Task!
	}
`;
