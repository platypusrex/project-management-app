import { mergeTypes } from 'merge-graphql-schemas';
import { userTypes } from "./user";
import { teamTypes } from "./team";
import { companyTypes } from "./company";
import { projectTypes } from "./project";
import { columnTypes } from "./column";
import { taskTypes } from "./task";

export const typeDefs = mergeTypes([
	userTypes,
	teamTypes,
	companyTypes,
	projectTypes,
	columnTypes,
	taskTypes,
]);