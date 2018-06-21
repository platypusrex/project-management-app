export const taskTypes = `
	type Task {
		id: Int!
		createdAt: String!
		updatedAt: String!
		task: String!
		columnId: Int!
		column: Column!
		creator: User!
	}
	
	type Query {
		getAllTasks: [Task]!
		getTaskById (taskId: Int!): Task!
		getTasksByColumnId (columnId: Int!): [Task]
	}
	
	type Mutation {
		createTask (task: String!, columnId: Int!, createdBy: Int!): Task!,
		updateTaskById (taskId: Int!, columnId: Int, task: String): Task!
	}
`;
