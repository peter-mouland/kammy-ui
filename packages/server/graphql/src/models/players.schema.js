const GraphQLJSON = require('graphql-type-json');

const schemaString = `
  scalar JSON

  input StatsInput {
    apps: Int
    asts: Int
    con: Int
    cs: Int
    gls: Int
    pensv: Int
    points: Int
    rcard: Int
    sb: Int
    subs: Int
    tb: Int
    ycard: Int
  }

  type Stats {
    apps: Int
    asts: Int
    con: Int
    cs: Int
    gls: Int
    pensv: Int
    points: Int
    rcard: Int
    sb: Int
    subs: Int
    tb: Int
    ycard: Int
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
  
  input GameWeekInput {
      fixtures: [FixtureInput]
      stats: StatsInput
  }
  
  type GameWeek {
      fixtures: [Fixture]
      stats: Stats
  }

  type Player {
    _id: String!
    name: String
    code: Int
    pos: String
    club: String
    value: Float
    skySportsPosition: String
    skySportsClub: String
    isHidden: Boolean
    new: Boolean
    fixtures: [Fixture]
    gameWeeks: [GameWeek]
    season: Stats
    gameWeek: Stats
  }

  type UpdatedPlayer { 
    _id: String!
    code: Int
    name: String
    pos: String
    club: String
    value: Float
    skySportsClub: String
    skySportsPosition: String
    isHidden: Boolean
    new: Boolean
    fixtures: [Fixture]
    gameWeeks: [GameWeek]
    season: Stats
    gameWeek: Stats
  }

  input PlayerUpdates {
    _id: String
    code: Int
    name: String
    pos: String
    club: String
    value: Float
    skySportsClub: String
    skySportsPosition: String
    isHidden: Boolean
    new: Boolean
    fixtures: [FixtureInput]
    gameWeeks: [GameWeekInput]
    season: StatsInput
    gameWeek: StatsInput
  }
  
  type Query {
    getPlayers: [Player]
    getPlayer(code: Int): Player
  }
  
  type Mutation {
    upsertPlayers(playerUpdates: [PlayerUpdates]): [UpdatedPlayer]
    mergePlayers: [UpdatedPlayer]
  }
`;

const resolveFunctions = {
  JSON: GraphQLJSON,
};

module.exports.playersSchema = schemaString;
module.exports.resolveFunctions = resolveFunctions;
