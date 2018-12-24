const schemaString = `
  type GameWeek {
    gameWeek: Int
    start: String
    end: String
  }
  
  type GameWeeks {
    gameWeeks: [GameWeek]
    count: Int
    currentGameWeek: Int
  }
`;

export default schemaString;
