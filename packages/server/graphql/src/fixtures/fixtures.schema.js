const schemaString = `
  type SeasonFixture {
    status: String
    week: Int,
    event: Int,
    date: String
    hTname: String
    aTname: String
    hTcode: String
    hScore: Int,
    aTcode: String
    aScore: Int
  }
  
  type SeasonFixtures {
    fixtures: [SeasonFixture]
  }
`;

export default schemaString;
