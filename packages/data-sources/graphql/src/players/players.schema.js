const GraphQLJSON = require('graphql-type-json');

const schemaString = `
  scalar JSON

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
    skySportsPos: String
    skySportsClub: String
    isHidden: Boolean
    new: Boolean
    fixtures: [Fixture]
  }

  type UpdatedPlayer { 
    _id: String!
    code: Int
    name: String
    pos: String
    skySportsPos: String
    club: String
    skySportsClub: String
    isHidden: Boolean
    new: Boolean
    fixtures: [Fixture]
  }

  input PlayerUpdates {
    _id: String
    code: Int
    name: String
    pos: String
    skySportsPos: String
    club: String
    skySportsClub: String
    isHidden: Boolean
    new: Boolean
    fixtures: [FixtureInput]
  }
  
  type Query {
    getPlayers: [Player]
    getPlayer(code: Int): Player
  }
  
  type Mutation {
    upsertPlayers(playerUpdates: [PlayerUpdates]): [UpdatedPlayer]
  }
`;

const resolveFunctions = {
  JSON: GraphQLJSON,
};

module.exports.playersSchema = schemaString;
module.exports.resolveFunctions = resolveFunctions;
