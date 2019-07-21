import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

import { selectors as draftSetupSelectors } from '@kammy-ui/redux.draft-setup';
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
const getLeagueRank = ({ points, pointsLastWeek }) => {
  const divisionRank = getDivisionRank(points);
  return {
    current: divisionRank,
    lastWeek: getDivisionRank(pointsLastWeek),
    change: getRankChange(pointsLastWeek, divisionRank),
  };
};

const seasonCombiner = ({ data: players }, { gameWeeks }, { transfers = [] }, managers, teams) => (
  players && gameWeeks.length && teams
    ? managerSeason({
      managers, teams, gameWeeks, players, transfers, withStats: true,
    })
    : null
);

const pointsCombiner = (managersSeason, { selectedGameWeek }, managers) => (
  managers && managersSeason && selectedGameWeek
    ? getDivisionPoints(managers, managersSeason, selectedGameWeek)
    : undefined
);

const pointsLastWeekCombiner = (managersSeason, { selectedGameWeek }, managers) => {
  const gameWeekIdx = selectedGameWeek - 1;
  return gameWeekIdx > 0 && managers && managersSeason
    ? getDivisionPoints(managers, managersSeason, gameWeekIdx)
    : undefined;
};

const makeLineChartData = (managersSeason, { gameWeeks }, managers) => (
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

const getLeagueStats = (season, gameWeeks, managers) => ({
  points: pointsCombiner(season, gameWeeks, managers),
  pointsLastWeek: pointsLastWeekCombiner(season, gameWeeks, managers),
  lineChart: makeLineChartData(season, gameWeeks, managers),
});

const selectorFactory = (division) => {
  const leagueSeason = createSelector(
    playerSelectors.getAllPlayerData,
    gameWeekSelectors.getGameWeeks,
    transferSelectors[`${division}Valid`],
    draftSetupSelectors.getDraftSetup,
    (players, gameWeeks, league, { byDivision }) => (
      seasonCombiner(players, gameWeeks, league, byDivision.managers[division], byDivision.teams[division])
    ),
  );
  const stats = createSelector(
    leagueSeason,
    gameWeekSelectors.getGameWeeks,
    draftSetupSelectors.getDraftSetup,
    (season, gameWeeks, { byDivision }) => (
      getLeagueStats(season, gameWeeks, byDivision.managers[division])
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
