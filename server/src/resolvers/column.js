export const columnResolvers = {
	Column: {
		project: (parent, args, {models}) => models.Project.findOne({
			where: {id: parent.projectId}
		}),
		tasks: (parent, args, {models}) => models.Task.findAll({
			where: {columnId: parent.id}
		})
	},

	Query: {
		getAllColumns: (parent, args, {models}) => models.Column.findAll(),
		getColumnById: (parent, {columnId}, {models}) => models.Column.findOne({
			where: {id: columnId}
		})
	},

	Mutation: {
		createColumn: (parent, args, {models}) => models.Column.create(args),
    updateColumnById: async (parent, args, {models}) => {
		  console.log('args', args);

      const [rowsUpdated, [column]] = await models.Column.update(
        args,
        {
          returning: true,
          where: {id: args.columnId}
        }
      );

      console.log('column', column);

      return column;
    },
    deleteColumnById: (parent, {columnId}, {models}) => models.Column.destroy({
      where: {id: columnId}
    })
	}
};
