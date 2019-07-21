const schemaString = `
  type Managers {
    manager: String
    division: String
  }

  type Divisions {
    id: String
    label: String
    order: Int
  }

  type DivisionDraft {
    manager: String
    code: String
    position: String
    player: String
  }
  
  type DraftSetup {
    divisions: [Divisions]
    managers: [Managers]
    draftPremierLeague: [DivisionDraft]
    draftChampionship: [DivisionDraft]
    draftLeagueOne: [DivisionDraft]
  }
`;

export default schemaString;
