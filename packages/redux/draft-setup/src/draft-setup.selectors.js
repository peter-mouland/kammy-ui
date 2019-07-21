import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const statusSelector = (state) => get(state, 'draftSetup.status') || {};
const managersSelector = (state) => get(state, 'draftSetup.data.managers') || [];
const divisionsSelector = (state) => get(state, 'draftSetup.data.divisions') || [];

export const draftPremierLeagueSelector = (state) => get(state, 'draftSetup.data.draftPremierLeague') || [];
export const draftChampionshipSelector = (state) => get(state, 'draftSetup.data.draftChampionship') || [];
export const draftLeagueOneSelector = (state) => get(state, 'draftSetup.data.draftLeagueOne') || [];

export const getStatus = createSelector(
  statusSelector,
  ({ loading, loaded, errors }) => ({
    loading,
    loaded,
    errors,
  }),
);

export const getDraftSetup = createSelector(
  managersSelector,
  divisionsSelector,
  draftPremierLeagueSelector,
  draftChampionshipSelector,
  draftLeagueOneSelector,
  (unsortedManagers, unsortedDivisions, draftPremierLeague, draftChampionship, draftLeagueOne) => {
    const draft = [...draftPremierLeague, ...draftChampionship, ...draftLeagueOne];
    const divisions = unsortedDivisions.sort((prev, curr) => (prev.order < curr.order ? -1 : 1));
    const managers = unsortedManagers.sort((prev, curr) => (prev.manager < curr.manager ? -1 : 1));

    const managerNamesByDivisions = divisions.reduce((prev, division) => ({
      ...prev,
      [division.id]: managers.filter((manager) => manager.division === division.id).map(({ manager }) => manager),
    }), {});

    const playerNamesByManager = draft.reduce((prev, { manager }) => ({
      ...prev,
      [manager]: draft.filter((pick) => pick.manager === manager).map(({ player }) => player),
    }), {});

    const playersByManager = draft.reduce((prev, { manager }) => ({
      ...prev,
      [manager]: draft.filter((pick) => pick.manager === manager),
    }), {});

    const playerNamesByDivisions = divisions.reduce((prev, division) => ({
      ...prev,
      [division.id]: managers
        .filter((manager) => manager.division === division.id)
        .reduce((prevList, { manager }) => ([...prevList, ...playerNamesByManager[manager] || []]), []),
    }), {});

    const teamsByDivisions = divisions.reduce((prevDivisions, division) => ({
      ...prevDivisions,
      [division.id]: managers
        .filter((manager) => manager.division === division.id)
        .reduce((prevManagers, { manager }) => ({
          ...prevManagers,
          [manager]: playersByManager[manager],
        }), {}),
    }), {});

    return {
      managers, // [{ manager: "Craig", division: "premierLeague" }]
      managerNames: managers.map(({ manager }) => manager), // ["manager"]
      divisions,
      drafts: {
        premierLeague: draftPremierLeague, // [{ manager: '', pos: '', player: '' }]
        championship: draftChampionship,
        leagueOne: draftLeagueOne,
      },
      byDivision: {
        managers: managerNamesByDivisions, // { Championship: ['managers'], ...}
        playerNames: playerNamesByDivisions, // { Championship: ['players'], ...}
        teams: teamsByDivisions, // { championship: { managerA: [{ pos: '', name: '', manager: '' }] } }
      },
      byManager: {
        playerNames: playerNamesByManager, // { ManagerA: ['players'], ...}
        players: playersByManager, // { ManagerA: [{ player: 'players', pos: 'GK' }], ...}
      },
    };
  },
);
