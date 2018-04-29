/* eslint-disable no-confusing-arrow */
const { getUser, addUser, updateUser, getUsersWithTeams } = require('./db/user/user.actions');
const { getPlayers, getPlayerFixtures, updatePlayers, importPlayers } = require('./db/player/player.actions');
const { updateTeam, getTeams, getTeam, assignTeamToDivision } = require('./db/team/team.actions');
const { getSeasons, getDivisions, addDivision, addSeason, updateSeason } = require('./db/season/season.actions');
const { getExternalStats, saveGameWeekStats, saveSeasonStats } = require('./db/stats/stats.actions');

const getDashboard = (args, context) => (context.user)
  ? ({ message: "You're authorized to see this secret message." })
  : ({ message: 'default message' });

// The root provides the top-level API endpoints
module.exports = {
  getExternalStats,
  saveGameWeekStats,
  saveSeasonStats,
  getPlayers,
  getPlayerFixtures,
  importPlayers,
  updatePlayers,
  getSeasons,
  addSeason,
  updateSeason,
  getDivisions,
  addDivision,
  assignTeamToDivision,
  getTeams,
  getTeam,
  updateTeam,
  getUsersWithTeams,
  getUser,
  addUser,
  updateUser,
  getDashboard,
};
