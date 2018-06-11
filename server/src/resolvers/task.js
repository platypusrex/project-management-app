export const taskResolvers = {
	Task: {
		column: (parent, args, {models}) => models.Column.findOne({
			where: {id: parent.columnId}
		})
	},

	Query: {
		getAllTasks: (parent, args, {models}) => models.Task.findAll(),
		getTaskById: (parent, {taskId}, {models}) => models.Task.findOne({
			where: {id: taskId}
		})
	},

	Mutation: {
		createTask: (parent, args, {models}) => models.Task.create(args)
	}
};