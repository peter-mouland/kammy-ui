const stats = `
 apps subs gls asts cs con tb sb pensv ycard rcard points
`;

const playerStatsFragment = `
fragment playerStatsInfo on Player {
 gameWeek { ${stats} }
 season { ${stats} }
}`;

const teamPointsFragment = `
fragment teamPointsInfo on Team {
 gameWeek {
    points gk sub cbleft cbright fbleft fbright midleft midright amleft amright strleft strright
 }
 season {
    points gk sub cbleft cbright fbleft fbright midleft midright amleft amright strleft strright
 }
}`;

const divisionPointsFragment = `
fragment divisionPointsInfo on Team {
 gameWeek {
    points gks cb fb mid am str
 }
 gameWeekRankChange {
    points gks cb fb mid am str
 }
 season {
    points gks cb fb mid am str
 }
 seasonRank {
    points gks cb fb mid am str
 }
}`;

const minPlayerFragment = `
fragment minPlayerInfo on MinPlayerDetail {
  _id name club code
}`;

const playerFragment = `
fragment playerInfo on Player {
  _id code pos name club isHidden new value
}`;

const divisionFragment = `
fragment divisionInfo on Division { 
  _id name tier
}`;

const teamFragment = `
${minPlayerFragment}
fragment teamInfo on Team {
  _id user { _id name } season { _id name } division { _id name } name 
  gk { ...minPlayerInfo } 
  cbleft { ...minPlayerInfo } cbright { ...minPlayerInfo }
  fbleft { ...minPlayerInfo } fbright { ...minPlayerInfo } 
  midleft { ...minPlayerInfo } midright { ...minPlayerInfo } 
  amleft { ...minPlayerInfo } amright { ...minPlayerInfo } 
  strleft { ...minPlayerInfo } strright { ...minPlayerInfo } 
  sub { ...minPlayerInfo }
}`;

const seasonFragment = `
${divisionFragment}
fragment seasonInfo on Season {
  _id name currentGW isLive divisions { ...divisionInfo }
}
`;

const getPlayersQuery = `
${playerFragment}
${playerStatsFragment}
query ($player: String) { 
  getPlayers(player: $player){ 
    ...playerInfo ...playerStatsInfo
 }
} 
`;

const getPlayerFixturesQuery = `
query ($code: Int) { 
  getPlayerFixtures(code: $code){
    name club code fixtures { 
      homeTeam status date awayTeam awayScore event homeScore stats { ${stats} } 
    }
 }
} 
`;

const getExternalStatsQuery = `
  query ($currentGW: Int, $source: String) { getExternalStats(currentGW: $currentGW, source: $source){ stats } } 
`;
const getDashboardQuery = `
  query { getDashboard{ message } } 
`;

const getSeasonsQuery = `
  ${seasonFragment}
  query { getSeasons{ ...seasonInfo } }
`;

const getTeamQuery = `
  ${teamFragment}
  query ($teamId: String) { getTeam(teamId: $teamId){ ...teamInfo } } 
`;

const getTeamsQuery = `
  ${teamFragment}
  ${teamPointsFragment}
  query { getTeams{ ...teamInfo ...teamPointsInfo } } 
`;

const getUsersWithTeamsQuery = `
  ${teamFragment}
  query { getUsersWithTeams{ _id name email isAdmin teams { ...teamInfo } } } 
`;

const getDivisionsQuery = `
  ${teamFragment}
  ${divisionPointsFragment}
  query { getDivisions{ _id name tier teams { ...teamInfo ...divisionPointsInfo } } }
`;

const addSeasonsMutation = `
  ${seasonFragment}
  mutation ($name: String) { addSeason(name: $name){ ...seasonInfo } }
`;

const addDivisionsMutation = `
  ${divisionFragment}
  mutation ($seasonId: String, $name: String) { 
    addDivision(seasonId: $seasonId, name: $name){ ...divisionInfo } 
  }
`;

const addUserMutation = `
  ${teamFragment}
  mutation ($seasonId: String, $divisionId: String, $name: String, $email: String, $isAdmin: Boolean) { 
    addUser(seasonId: $seasonId, divisionId: $divisionId, name: $name, email: $email, isAdmin: $isAdmin){ _id name email isAdmin teams { ...teamInfo } } 
  }
`;

const updateUserMutation = `
  ${teamFragment}
  mutation ($_id: String, $name: String, $email: String, $isAdmin: Boolean) { 
    updateUser(_id: $_id, name: $name, email: $email, isAdmin: $isAdmin){ _id name email isAdmin teams { ...teamInfo } } 
  }
`;

const assignTeamToDivisionMutation = `
  ${teamFragment}
  mutation ($divisionId: String, $divisionName: String, $teamId: String) { 
    assignTeamToDivision(divisionId: $divisionId, divisionName: $divisionName, teamId: $teamId){ ...teamInfo } 
  }
`;

const updatePlayersMutation = `
  mutation ($playerUpdates: [PlayerUpdates]) { 
    updatePlayers(playerUpdates: $playerUpdates){ _id code pos name club isHidden new value }   
  }
`;

const importPlayersMutation = `
  mutation { importPlayers { _id code pos name club } }
`;

const updateTeamMutation = `
  ${teamFragment}
  mutation ($teamUpdate: TeamUpdate) { 
    updateTeam(teamUpdate: $teamUpdate){ ...teamInfo }   
  }
`;

const updateSeasonMutation = `
  ${seasonFragment}
  mutation ($seasonId: String, $isLive: Boolean, $currentGW: Int) { 
    updateSeason(seasonId: $seasonId, isLive: $isLive, currentGW: $currentGW){ ...seasonInfo }   
  }
`;

const saveGameWeekStatsMutation = `
  mutation ($seasonId: String, $update: JSON) { 
    saveGameWeekStats(seasonId: $seasonId, update: $update){ stats }   
  }
`;

const saveSeasonStatsMutation = `
  mutation ($seasonId: String) { 
    saveSeasonStats(seasonId: $seasonId){ stats }   
  }
`;

module.exports = {
  getPlayersQuery,
  getPlayerFixturesQuery,
  getExternalStatsQuery,
  getDashboardQuery,
  getSeasonsQuery,
  getTeamQuery,
  getTeamsQuery,
  getUsersWithTeamsQuery,
  getDivisionsQuery,
  addSeasonsMutation,
  addDivisionsMutation,
  addUserMutation,
  updateUserMutation,
  assignTeamToDivisionMutation,
  updatePlayersMutation,
  importPlayersMutation,
  updateTeamMutation,
  updateSeasonMutation,
  saveGameWeekStatsMutation,
  saveSeasonStatsMutation,
};
