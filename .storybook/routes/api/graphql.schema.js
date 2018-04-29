const { makeExecutableSchema } = require('graphql-tools');
const GraphQLJSON = require('graphql-type-json');

const schemaString = `
  scalar JSON

  type PlayerStats {
    points: Int
    apps: Int
    subs: Int
    gls: Int
    asts: Int
    cs: Int
    con: Int
    sb: Int
    tb: Int
    pensv: Int
    ycard: Int
    rcard: Int
  }

  type Points {
    gks: Int
    gk: Int
    cbleft: Int
    cbright: Int
    fbleft: Int
    fbright: Int
    amleft: Int
    amright: Int
    midleft: Int
    midright: Int
    strleft: Int
    strright: Int
    cb: Int 
    fb: Int 
    mid: Int 
    am: Int 
    str: Int
    sub: Int
    points: Int
  }

  type Rank {
    gks: Float
    cb: Float 
    fb: Float 
    mid: Float 
    am: Float 
    str: Float
    points: Float
  }

  type MinDetail {
    _id: String
    name: String
  }

  type SeasonDetail {
    _id: String
    name: String
    points: Int,
    transfersRequested: Int,
    transfersMade: Int,
    gks: Int,
    fb: Int,
    cb: Int,
    mid: Int,
    am: Int,
    str: Int,
    gk: Int,
    cbleft: Int,
    cbright: Int,
    fbleft: Int,
    fbright: Int,
    midleft: Int,
    midright: Int,
    amleft: Int,
    amright: Int,
    strleft: Int,
    strright: Int,
    sub: Int,
  }

  type MinPlayerDetail {
    _id: String
    name: String
    club: String
    code: Int
    season: Points
    gameWeek: Points
  }
  
  type Team {
    _id: String
    name: String
    user: MinDetail
    season: SeasonDetail
    division: MinDetail
    gk: MinPlayerDetail
    cbleft: MinPlayerDetail
    cbright: MinPlayerDetail
    fbleft: MinPlayerDetail
    fbright: MinPlayerDetail
    midleft: MinPlayerDetail
    midright: MinPlayerDetail
    amleft: MinPlayerDetail
    amright: MinPlayerDetail
    strleft: MinPlayerDetail
    strright: MinPlayerDetail
    sub: MinPlayerDetail
    gameWeek: Points
    gameWeekRankChange: Rank
    seasonRank: Rank
  }
  type Division {
    _id: String
    name: String
    tier: Int
  }

  type Season {
    _id: String!
    name: String
    isLive: Boolean
    currentGW: Int
    divisions: [Division]
  }

  type Fixture {
    event: Int
    date: String
    homeTeam: String
    awayTeam: String
    status: String
    awayScore: Int
    homeScore: Int
    stats: PlayerStats
  }

  type UpdatedPlayer { 
    _id: String!
    code: Int
    name: String
    pos: String
    club: String
    isHidden: Boolean
    new: Boolean
    value: Float
  }

  type Player {
    _id: String!
    isHidden: Boolean
    name: String!
    code: Int
    pos: String
    club: String
    new: Boolean
    value: Float
    gameWeek: PlayerStats
    season: PlayerStats
    pointsChange: Int
  }
  
  type PlayerFixtures {
    name: String!
    code: Int
    club: String
    fixtures: [Fixture]
  }

  type User {
    _id: String!
    email: String!
    name: String
    isAdmin: Boolean
    mustChangePassword: Boolean
  }
  
  type Dashboard {
    message: String!
  }

  type UserTeams {
    _id: String!
    email: String!
    name: String
    isAdmin: Boolean
    mustChangePassword: Boolean
    teams: [Team]
  }
  
  type Divisions {
    _id: String!
    tier: Int
    name: String
    teams: [Team]
  }

  # Object of players and their stats.
  # ie.
  # {
  #   [playerName]: { ...PlayerStats }
  # }
  type Stats {
    stats: JSON 
  }
  
  input InputStats {
    stats: JSON
  }
  
  input InputMinDetail {
    _id: String
    name: String
  }
  input InputMinPlayerDetail {
    _id: String
    name: String
    club: String
    code: Int
    pos: String
  }

  input TeamUpdate {
    _id: String
    name: String
    user: InputMinDetail
    season: InputMinDetail
    division: InputMinDetail
    gk: InputMinPlayerDetail
    cbleft: InputMinPlayerDetail
    cbright: InputMinPlayerDetail
    fbleft: InputMinPlayerDetail
    fbright: InputMinPlayerDetail
    midleft: InputMinPlayerDetail
    midright: InputMinPlayerDetail
    amleft: InputMinPlayerDetail
    amright: InputMinPlayerDetail
    strleft: InputMinPlayerDetail
    strright: InputMinPlayerDetail
    sub: InputMinPlayerDetail
  }

  input PlayerUpdates {
    _id: String
    code: Int
    club: String
    name: String
    pos: String
    isHidden: Boolean
    new: Boolean
    value: Float
  }
  
  type Query {
    getTeam(teamId: String): Team
    getTeams: [Team]
    getExternalStats(currentGW: Int, source: String): Stats
    getSeasons: [Season]
    getDivisions: [Divisions]
    getPlayers(player: String): [Player]
    getPlayerFixtures(code: Int): PlayerFixtures
    getUser(email: String, _id: String): User
    getUsersWithTeams: [UserTeams]
    getDashboard: Dashboard
  }
  
  type Mutation {
    importPlayers: [UpdatedPlayer]
    updatePlayers(playerUpdates: [PlayerUpdates]): [UpdatedPlayer]
    addUser(seasonId: String, divisionId: String, email: String, name: String, isAdmin: Boolean): UserTeams
    updateUser(_id: String, email: String, name: String, isAdmin: Boolean): UserTeams
    addDivision(seasonId: String, name: String): Division
    addSeason(name: String): Season
    updateTeam(teamUpdate: TeamUpdate): Team
    assignTeamToDivision(divisionId: String, divisionName: String, teamId: String): Team
    updateSeason(seasonId: String, isLive: Boolean, currentGW: Int): Season
    saveGameWeekStats(seasonId: String, update: JSON): Stats
    saveSeasonStats(seasonId: String): Stats
  }
`;

const resolveFunctions = {
  JSON: GraphQLJSON
};

const jsSchema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions });

module.exports = jsSchema;
