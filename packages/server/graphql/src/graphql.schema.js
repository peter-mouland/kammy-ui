import { makeExecutableSchema } from 'graphql-tools';
import { playersSchema, resolveFunctions as playerResolvers } from './models/players.schema';
import divisionSchema from './models/division.schema';

const schemaString = `
  ${divisionSchema}
  ${playersSchema}

  type Query {
    getPlayers: [Player]
    getPlayer(code: Int): Player
    getDivision(division: String): Division
  }
  
  type Mutation {
    upsertPlayers(playerUpdates: [PlayerUpdates]): [UpdatedPlayer]
    mergePlayers: [UpdatedPlayer]
  }
`;

const resolveFunctions = {
  ...playerResolvers,
};

const jsSchema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions });

export default jsSchema;
