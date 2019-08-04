import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const cupSelector = (state) => get(state, 'cup') || [];
const cupTeamSelector = (state) => get(state, 'cup.teams');
const cupDraftSelector = (state) => get(state, 'cup.draftCup');
const cupDraftLoadedSelector = (state) => get(state, 'cup.draftCupLoaded');
const statusSelector = (state) => get(state, 'cup.status');
const divisionsPlayersSelector = (state) => get(state, 'cup.divisionsPlayers');

export const getDraftCup = createSelector(
  cupDraftSelector,
  cupDraftLoadedSelector,
  (draftCup, loaded) => ({ draftCup, loaded }));

export const getStatus = createSelector(
  statusSelector,
  (status) => status,
);

export const getTeams = createSelector(
  cupTeamSelector,
  (teams) => ({
    data: teams,
    count: teams.length,
  }),
);
export const getCupMetaData = createSelector(
  cupSelector,
  (cup) => ({
    managers: cup.managers,
    groups: cup.groups,
    rounds: cup.rounds,
  }),
);

export const cupGroups = createSelector(
  cupTeamSelector,
  (teams) => ({
    data: teams.reduce((prev, team) => ({
      ...prev,
      [team.group]: [
        ...prev[team.group] || [],
        team,
      ],
    }), {}),
    count: teams.length,
  }),
);

export const teams = createSelector(
  getCupMetaData,
  cupTeamSelector,
  divisionsPlayersSelector,
  ({ managers }, cupTeams, divisionsPlayers) => {
    const players = []
      .concat(divisionsPlayers.leagueOne)
      .concat(divisionsPlayers.championship)
      .concat(divisionsPlayers.premierLeague);

    const pickedPlayers = !managers.length ? [] : managers.reduce((prev, manager) => {
      const groupTeams = cupTeams
        .filter((teamPlayer) => teamPlayer.manager === manager)
        .reduce((arr, team) => ([
          ...arr,
          team.player1.name,
          team.player2.name,
          team.player3.name,
          team.player4.name,
        ]), []);
      return {
        ...prev,
        [manager]: groupTeams,
      };
    }, {});

    return ({
      data: players.reduce((prev, player = {}) => {
        const managerPlayers = pickedPlayers[player.manager] || [];
        const picked = managerPlayers.includes(player.name);
        const prevPlayer = prev[player.manager] || {};
        try {
          return ({
            ...prev,
            [player.manager]: [prevPlayer, { ...player, picked }].filter(Boolean),
          });
        } catch (e) {
          console.error('errr')
          console.error(e)
          console.error({ prevPlayer });
          return prev;
        }
      }, {}),
    });
  },
);
