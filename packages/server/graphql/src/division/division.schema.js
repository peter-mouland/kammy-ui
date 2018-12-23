const schemaString = `
  type TeamPlayer {
    manager: String!
    code: Int
    club: String
    pos: String
    teamPos: String
    name: String
    season: Stats
    gameWeek: Stats
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
