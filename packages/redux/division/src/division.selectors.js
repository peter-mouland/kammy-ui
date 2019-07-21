import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

import { selectors as playerSelectors } from '@kammy-ui/redux.players';
import { selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { selectors as transferSelectors } from '@kammy-ui/redux.transfers';
import formatDiv from './format-division';
import getDivisionPoints from './lib/calculate-division-points';
import getDivisionRank from './lib/calculate-division-rank';
import getRankChange from './lib/calculate-rank-change';
import managerSeason from './lib/manager-season';

const currentTeamSelector = (state, div) => get(state, `division.${formatDiv(div)}.currentTeams`) || {};
const pendingTransfersSelector = (state, div) => get(state, `division.${formatDiv(div)}.pendingTransfers`) || [];
const statusSelector = (state, div) => get(state, `division.${formatDiv(div)}.status`) || {};

const seasonCombiner = ({ data: players }, { gameWeeks }, { transfers = [] }, teams) => (
  players && gameWeeks.length && teams
    ? managerSeason({
      teams, gameWeeks, players, transfers, withStats: true,
    })
    : null
);

const pointsCombiner = (managersSeason, { selectedGameWeek }, teams) => (
  teams && managersSeason && selectedGameWeek
    ? getDivisionPoints(teams, managersSeason, selectedGameWeek)
    : undefined
);

const pointsLastWeekCombiner = (managersSeason, { selectedGameWeek }, teams) => {
  const gameWeekIdx = selectedGameWeek - 1;
  return gameWeekIdx > 0 && teams && managersSeason
    ? getDivisionPoints(teams, managersSeason, gameWeekIdx)
    : undefined;
};

const makeLineChartData = (teams, gameWeeks, managersSeason) => (
  gameWeeks.map(({ gameWeek }, i) => {
    const points = getDivisionPoints(teams, managersSeason, i);
    const rank = getDivisionRank(points);
    return {
      gameWeek: `gw${gameWeek}`,
      ...rank.total,
    };
  })
);

export const premierLeagueSeason = createSelector(
  playerSelectors.getAllPlayerData,
  gameWeekSelectors.getGameWeeks,
  transferSelectors.premierLeagueValid,
  (state) => get(state, 'spreadsheet.premierLeague'),
  seasonCombiner,
);
export const premierLeaguePoints = createSelector(
  premierLeagueSeason,
  gameWeekSelectors.getGameWeeks,
  (state) => get(state, 'spreadsheet.premierLeague'),
  pointsCombiner,
);
export const premierLeaguePointsLastWeek = createSelector(
  premierLeagueSeason,
  gameWeekSelectors.getGameWeeks,
  (state) => get(state, 'spreadsheet.premierLeague'),
  pointsLastWeekCombiner,
);
export const premierLeagueLineChart = createSelector(
  (state) => get(state, 'spreadsheet.premierLeague'),
  gameWeekSelectors.getGameWeeks,
  premierLeagueSeason,
  (teams, { gameWeeks }, managersSeason) => (teams && gameWeeks && managersSeason
    ? makeLineChartData(teams, gameWeeks, managersSeason)
    : undefined),
);
export const premierLeagueRank = createSelector(premierLeaguePoints, getDivisionRank);
export const premierLeagueRankLastWeek = createSelector(premierLeaguePointsLastWeek, getDivisionRank);
export const premierLeagueRankChange = createSelector(premierLeagueRankLastWeek, premierLeagueRank, getRankChange);

export const championshipSeason = createSelector(
  playerSelectors.getAllPlayerData,
  gameWeekSelectors.getGameWeeks,
  transferSelectors.championshipValid,
  (state) => get(state, 'spreadsheet.championship'),
  seasonCombiner,
);
export const championshipPoints = createSelector(
  championshipSeason,
  gameWeekSelectors.getGameWeeks,
  (state) => get(state, 'spreadsheet.championship'),
  pointsCombiner,
);
export const championshipPointsLastWeek = createSelector(
  championshipSeason,
  gameWeekSelectors.getGameWeeks,
  (state) => get(state, 'spreadsheet.championship'),
  pointsLastWeekCombiner,
);
export const championshipLineChart = createSelector(
  (state) => get(state, 'spreadsheet.championship'),
  gameWeekSelectors.getGameWeeks,
  championshipSeason,
  (teams, { gameWeeks }, managersSeason) => (teams && gameWeeks && managersSeason
    ? makeLineChartData(teams, gameWeeks, managersSeason)
    : undefined),
);
export const championshipRank = createSelector(championshipPoints, getDivisionRank);
export const championshipRankLastWeek = createSelector(championshipPointsLastWeek, getDivisionRank);
export const championshipRankChange = createSelector(championshipRank, championshipRankLastWeek, getRankChange);

export const leagueOneSeason = createSelector(
  playerSelectors.getAllPlayerData,
  gameWeekSelectors.getGameWeeks,
  transferSelectors.leagueOneValid,
  (state) => get(state, 'spreadsheet.leagueOne'),
  seasonCombiner,
);
export const leagueOnePoints = createSelector(
  leagueOneSeason,
  gameWeekSelectors.getGameWeeks,
  (state) => get(state, 'spreadsheet.leagueOne'),
  pointsCombiner,
);
export const leagueOnePointsLastWeek = createSelector(
  leagueOneSeason,
  gameWeekSelectors.getGameWeeks,
  (state) => get(state, 'spreadsheet.leagueOne'),
  pointsLastWeekCombiner,
);
export const leagueOneLineChart = createSelector(
  (state) => get(state, 'spreadsheet.leagueOne'),
  gameWeekSelectors.getGameWeeks,
  leagueOneSeason,
  (teams, { gameWeeks }, managersSeason) => (teams && gameWeeks && managersSeason
    ? makeLineChartData(teams, gameWeeks, managersSeason)
    : undefined),
);
export const leagueOneRank = createSelector(leagueOnePoints, getDivisionRank);
export const leagueOneRankLastWeek = createSelector(leagueOnePointsLastWeek, getDivisionRank);
export const leagueOneRankChange = createSelector(leagueOneRank, leagueOneRankLastWeek, getRankChange);

export const getStatus = createSelector(
  statusSelector,
  (status) => status,
);

export const getCurrentPlayers = createSelector(
  currentTeamSelector,
  ({ players = [] }) => ({
    data: players,
    byName: players.reduce((prev, player) => ({
      ...prev,
      [player.name]: player,
    }), {}),
    count: players.length,
  }),
);

export const getCurrentTeams = createSelector(
  currentTeamSelector,
  ({ players = [] }) => ({
    data: players.reduce((prev, player) => ({
      ...prev,
      [player.manager]: prev[player.manager] ? [...prev[player.manager], player] : [player],
    }), {}),
    count: players.length,
  }),
);


export const getPendingTransfers = createSelector(
  pendingTransfersSelector,
  (transfers = []) => ({
    data: transfers.reduce((prev, transfer) => ({
      ...prev,
      [transfer.manager]: prev[transfer.manager] ? [...prev[transfer.manager], transfer] : [transfer],
    }), {}),
    count: transfers.length,
  }),
);
