const schemaString = `
  type CupTeam {
    player1: String
    player2: String
    player3: String
    player4: String
    manager: String
    group: String
    round: Int
    dateCreated: String
  }

  input CupTeamInput {
    player1: String
    player2: String
    player3: String
    player4: String
    manager: String
    group: String
    round: Int
  }

  type CupPlayer {
    code: Int
    pos: String
    name: String
    points: Int
    rank: Int
  }

  type Team {
    row: Int
    group: String
    round: String
    gameWeek: Int
    manager: String
    player1: CupPlayer
    player2: CupPlayer
    player3: CupPlayer
    player4: CupPlayer
    points: Int
    rank: Int
  }
  
  type DivisionPlayers {
    teamPos: String,
    pos: String,
    code: Int,
    name: String,
    club: String,
    manager: String 
  }
  
  type DivisionsPlayers {
    leagueOne: [DivisionPlayers]
    championship: [DivisionPlayers]
    premierLeague: [DivisionPlayers]
  }
  
  type MutateResponse {
      success: Boolean
      message: String
  }
  
  type Cup {
    teams: [Team]
    managers: [String]
    groups: [String]
    rounds: [String]
  }
`;

export default schemaString;
