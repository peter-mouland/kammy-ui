import { makeExecutableSchema } from 'graphql-tools';
import { playersSchema, resolveFunctions as playerResolvers } from './models/players.schema';
import cupSchema from './models/cup.schema';
import divisionSchema from './models/division.schema';
import gameWeekSchema from './models/game-week.schema';

const schemaString = `
  ${cupSchema}
  ${divisionSchema}
  ${gameWeekSchema}
  ${playersSchema}

  type Query {
    getPlayers: [Player]
    getPlayer(code: Int): Player
    getDivision(division: String): Division
    getCup: Cup
    getGameWeeks: GameWeeks
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
