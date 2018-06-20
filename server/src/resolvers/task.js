export const taskResolvers = {
	Task: {
		column: (parent, args, {models}) => models.Column.findOne({
			where: {id: parent.columnId}
		}),
    creator: (parent, args, {models}) => models.User.findOne({
      where: {id: parent.createdBy}
    })
	},

	Query: {
		getAllTasks: (parent, args, {models}) => models.Task.findAll(),
		getTaskById: (parent, {taskId}, {models}) => models.Task.findOne({
			where: {id: taskId}
		}),
    getTasksByColumnId: (parent, {columnId}, {models}) => models.Task.findAll({
      where: {columnId}
    })
	},

	Mutation: {
		createTask: (parent, args, {models}) => models.Task.create(args)
	}
};
