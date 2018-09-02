const schemaString = `
  type GameWeek {
    gameWeek: Int
    start: String
    end: String
  }
  
  type GameWeeks {
    gameWeeks: [GameWeek]
    count: Int
  }
`;

export default schemaString;
