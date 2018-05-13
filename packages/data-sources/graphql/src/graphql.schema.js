const { makeExecutableSchema } = require('graphql-tools');
const { playersSchema, resolveFunctions: playerResolvers } = require('./players/players.schema');

const schemaString = `
  ${playersSchema}
`;

const resolveFunctions = {
  ...playerResolvers,
};

const jsSchema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions });

module.exports = jsSchema;
