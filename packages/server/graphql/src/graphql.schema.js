import { makeExecutableSchema } from 'graphql-tools';
import { playersSchema, resolveFunctions as playerResolvers } from './players/players.schema';
import cupSchema from './cup/cup.schema';
import divisionSchema from './division/division.schema';
import transfersSchema from './transfers/transfers.schema';
import fixturesSchema from './fixtures/fixtures.schema';
import gameWeekSchema from './game-weeks/game-week.schema';
import draftSetupSchema from './draft-setup/draft.schema';

const schemaString = `
  ${draftSetupSchema}
  ${cupSchema}
  ${divisionSchema}
  ${gameWeekSchema}
  ${playersSchema}
  ${transfersSchema}
  ${fixturesSchema}

  type Query {
    getDraftSetup: DraftSetup
    getPlayers: [Player]
    getPlayer(code: Int): Player
    getDivision(division: String): Division
    getCup: Cup
    getDraftCup: [CupTeam]
    getGameWeeks: GameWeeks
    getTransfers(division: String): [Transfer]
    getFixtures: SeasonFixtures
  }
  
  type Mutation {
    upsertPlayers(playerUpdates: [PlayerUpdates]): [UpdatedPlayer]
    mergePlayers: [UpdatedPlayer]
    saveCupTeam(cupTeamInput: CupTeamInput): MutateResponse
    saveTransfers(transfers: [TransferInput]): MutateResponse
  }
`;

const resolveFunctions = {
  ...playerResolvers,
};

const jsSchema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions });

export default jsSchema;
