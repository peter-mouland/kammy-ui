const schemaString = `
  type CupPlayer {
    code: Int
    pos: String
    name: String
    points: Int
    rank: Int
  }

  type Team {
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
  
  type Cup {
    divisionsPlayers: DivisionsPlayers
    teams: [Team]
    managers: [String]
    groups: [String]
    rounds: [String]
  }
`;

export default schemaString;
