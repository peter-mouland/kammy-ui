const schemaString = `
  input TransferInput {
    division: String
    transferIn: String
    transferOut: String
    transferType: String
    manager: String
    status: String
    timestamp: String
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
  }
`;

export default schemaString;
