export const taskTypes = `
	type Task {
		id: Int!
		createdAt: String!
		updatedAt: String!
		task: String!
		column: Column!
	}
	
	type Query {
		getAllTasks: [Task]!
		getTaskById (taskId: Int!): Task!
	}
	
	type Mutation {
		createTask (task: String!, projectId: Int!): Task!
	}
`;