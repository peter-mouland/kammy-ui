const GraphQLJSON = require('graphql-type-json');

const schemaString = `
  scalar JSON

  input StatsSummaryInput {
      week: [Int]
      month: [Int]
      season: [Int]
  }

  type StatsSummary {
      week: [Int]
      month: [Int]
      season: [Int]
  }

  input FixtureInput {
    aScore: Int
    aTname: String
    date: String
    event: Int
    hScore: Int
    hTname: String
    status: String
    stats: [Int]
  }

  type Fixture {
    aScore: Int
    aTname: String
    date: String
    event: Int
    hScore: Int
    hTname: String
    status: String
    stats: [Int]
  }

  type Player {
    _id: String!
    name: String
    code: Int
    pos: String
    club: String
    skySportsPosition: String
    skySportsClub: String
    isHidden: Boolean
    new: Boolean
    stats: StatsSummary
    fixtures: [Fixture]
  }

  type UpdatedPlayer { 
    _id: String!
    code: Int
    name: String
    pos: String
    skySportsPosition: String
    club: String
    skySportsClub: String
    isHidden: Boolean
    new: Boolean
    fixtures: [Fixture]
    stats: StatsSummary
  }

  input PlayerUpdates {
    _id: String
    code: Int
    name: String
    pos: String
    skySportsPosition: String
    club: String
    skySportsClub: String
    isHidden: Boolean
    new: Boolean
    fixtures: [FixtureInput]
    stats: StatsSummaryInput
  }
  
  type Query {
    getPlayers: [Player]
    getPlayer(code: Int): Player
  }
  
  type Mutation {
    upsertPlayers(playerUpdates: [PlayerUpdates]): [UpdatedPlayer]
    initPlayers: [UpdatedPlayer]
  }
`;

const resolveFunctions = {
  JSON: GraphQLJSON,
};

module.exports.playersSchema = schemaString;
module.exports.resolveFunctions = resolveFunctions;
