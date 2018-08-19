import { makeExecutableSchema } from 'graphql-tools';
import { playersSchema, resolveFunctions as playerResolvers } from './models/players.schema';

const schemaString = `
  ${playersSchema}
`;

const resolveFunctions = {
  ...playerResolvers,
};

const jsSchema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions });

export default jsSchema;
