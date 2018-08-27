import GraphQLJSON from 'graphql-type-json';

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
  
  type GameWeekFixtures {
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
    isHidden: Boolean
    new: Boolean
    fixtures: [Fixture]
    gameWeeks: [GameWeekFixtures]
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
    skySportsPosition: String
    isHidden: Boolean
    new: Boolean
    fixtures: [Fixture]
    gameWeeks: [GameWeekFixtures]
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
    skySportsPosition: String
    isHidden: Boolean
    new: Boolean
    fixtures: [FixtureInput]
    gameWeeks: [GameWeekInput]
    season: StatsInput
    gameWeek: StatsInput
  }
`;

export const resolveFunctions = {
  JSON: GraphQLJSON,
};

export const playersSchema = schemaString;
