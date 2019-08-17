import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

import { selectors as draftSetupSelectors } from '@kammy-ui/redux.draft-setup';
import { selectors as playerSelectors } from '@kammy-ui/redux.players';
import { selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';

import formatDiv from './format-division';
import getDivisionPoints from './lib/calculate-division-points';
import getDivisionRank from './lib/calculate-division-rank';
import getRankChange from './lib/calculate-rank-change';
import managerSeason from './lib/manager-season';

const teamsByGameWeekSelector = (div) => (state) => get(state, `division.${formatDiv(div)}.teamsByGameWeek`) || [];
const currentTeamSelector = (state, div) => get(state, `division.${formatDiv(div)}.currentTeams`) || {};
const pendingTransfersSelector = (state, div) => get(state, `division.${formatDiv(div)}.pendingTransfers`) || [];
const statusSelector = (state, div) => get(state, `division.${formatDiv(div)}.status`) || {};

const getLeagueRank = ({ points, pointsLastWeek }) => {
  const divisionRank = getDivisionRank(points);
  const divisionRankLastWeek = getDivisionRank(pointsLastWeek);
  return {
    current: divisionRank,
    lastWeek: divisionRankLastWeek,
    change: getRankChange(divisionRankLastWeek, divisionRank),
  };
};

const seasonCombiner = (gameWeeks, managers, { data }) => (
  gameWeeks.length
    ? managerSeason({ managers, gameWeeks, players: data })
    : null
);

const pointsCombiner = (managersSeason, selectedGameWeek = 1, managers) => (
  managers && managersSeason
    ? getDivisionPoints(managers, managersSeason, selectedGameWeek)
    : undefined
);

const pointsLastWeekCombiner = (managersSeason, selectedGameWeek = 1, managers) => {
  const gameWeekIdx = selectedGameWeek - 1;
  return gameWeekIdx > 0 && managers && managersSeason
    ? getDivisionPoints(managers, managersSeason, gameWeekIdx)
    : undefined;
};

const makeLineChartData = (managersSeason, gameWeeks, managers) => (
  gameWeeks.map(({ gameWeek }, i) => {
    if (!managers || !managersSeason) return { gameWeek: `gw${gameWeek}` };
    const points = getDivisionPoints(managers, managersSeason, i);
    const rank = getDivisionRank(points);
    return {
      gameWeek: `gw${gameWeek}`,
      ...rank.total,
    };
  })
);

const getLeagueStats = (season, gameWeeks, managers, selectedGameWeek) => ({
  points: pointsCombiner(season, selectedGameWeek, managers),
  pointsLastWeek: pointsLastWeekCombiner(season, selectedGameWeek, managers),
  lineChart: makeLineChartData(season, gameWeeks, managers),
});

const selectorFactory = (division) => {
  const leagueSeason = createSelector(
    teamsByGameWeekSelector(division),
    draftSetupSelectors.getDraftSetup,
    playerSelectors.getAllPlayerData,
    (gameWeeks, { byDivision }, players) => (
      seasonCombiner(gameWeeks, byDivision.managers[division], players)
    ),
  );
  const stats = createSelector(
    leagueSeason,
    teamsByGameWeekSelector(division),
    draftSetupSelectors.getDraftSetup,
    gameWeekSelectors.getGameWeeks,
    (season, gameWeeks, { byDivision }, { selectedGameWeek }) => (
      getLeagueStats(season, gameWeeks, byDivision.managers[division], selectedGameWeek)
    ),
  );
  return ({
    season: leagueSeason,
    stats,
    rank: createSelector(stats, getLeagueRank),
  });
};

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

export const getStatus = createSelector(statusSelector, (status) => status);
export const premierLeague = selectorFactory('premierLeague');
export const championship = selectorFactory('championship');
export const leagueOne = selectorFactory('leagueOne');
