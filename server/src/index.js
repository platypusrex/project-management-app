import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { port } from "./utils/config";
import models from './models';

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

const app = express();

app
	.use(cors('*'))
	.use(
		'/graphiql',
		graphiqlExpress({
			endpointURL: 'graphql'
		})
	)
	.use(
		'/graphql',
		bodyParser.json(),
		graphqlExpress({ schema, context: {models} })
	);

models
	.sequelize
	.sync({})
	.then(() => app.listen(port, () => console.log(`listening on port ${port}`)));
