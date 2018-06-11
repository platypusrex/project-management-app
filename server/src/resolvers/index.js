import { mergeResolvers } from 'merge-graphql-schemas';
import { userResolvers } from "./user";
import { teamResolvers } from "./team";
import { companyResolvers } from "./company";
import { projectResolvers } from "./project";
import { columnResolvers } from "./column";
import { taskResolvers } from "./task";

export const resolvers = mergeResolvers([
	userResolvers,
	teamResolvers,
	companyResolvers,
	projectResolvers,
	columnResolvers,
	taskResolvers,
]);