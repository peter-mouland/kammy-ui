const schemaString = `
  input TransferInput {
    division: String
    transferIn: String
    transferOut: String
    transferType: String
    manager: String
    status: String
    comment: String
  }
  
  type Transfer {
    division: String
    manager: String
    comment: String
    status: String
    timestamp: String
    transferIn: String
    codeIn: Int
    transferOut: String
    codeOut: Int
    type: String
    posIn: String
    posOut: String
    clubIn: String
    clubOut: String
  }
`;

export default schemaString;
