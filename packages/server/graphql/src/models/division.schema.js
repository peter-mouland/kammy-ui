const schemaString = `
  type TeamPlayer {
    manager: String!
    code: Int
    pos: String
    name: String
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
  
  type GameWeek {
    gameWeek: Int
    start: String
    end: String
    players: [TeamPlayer]
  }
  
  type Division {
    managers: [String]
    draft: [TeamPlayer]
    transfers: [Transfer]
    teamsByGameWeek: [GameWeek]
    currentTeams: [GameWeek]
  }
`;

export default schemaString;
