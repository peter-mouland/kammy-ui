const schemaString = `
  type TeamPlayer {
    manager: String!
    code: Int
    pos: String
    name: String
    season: Stats
    gameWeek: Stats
  }
  
  type Transfer {
    status: String
    timestamp: String
    manager: String
    transferIn: String
    codeIn: Int
    transferOut: String
    codeOut: Int
    type: String
  }
  
  type GameWeekPlayers {
    gameWeek: Int
    start: String
    end: String
    players: [TeamPlayer]
    seasonToGameWeek: Stats
  }
  
  type ManagersSeason {
    manager: String
    stats: Stats
  }
  
  type Division {
    division: String
    managers: [String]
    draft: [TeamPlayer]
    transfers: [Transfer]
    teamsByGameWeek: [GameWeekPlayers]
    currentTeams: GameWeekPlayers
    seasonStats: [ManagersSeason]
  }
`;

export default schemaString;
