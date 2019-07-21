import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const statusSelector = (state) => get(state, 'draftSetup.status') || {};
const managersSelector = (state) => get(state, 'draftSetup.data.managers') || [];
const divisionsSelector = (state) => get(state, 'draftSetup.data.divisions') || [];
const draftPremierLeagueSelector = (state) => get(state, 'draftSetup.data.draftPremierLeague') || [];
const draftChampionshipSelector = (state) => get(state, 'draftSetup.data.draftChampionship') || [];
const draftLeagueOneSelector = (state) => get(state, 'draftSetup.data.draftLeagueOne') || [];

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
  (managers, divisions, draftPremierLeague, draftChampionship, draftLeagueOne) => {
    const draft = [...draftPremierLeague, ...draftChampionship, ...draftLeagueOne];
    const managersByDivisions = divisions.reduce((prev, division) => ({
      ...prev,
      [division.id]: managers.filter((manager) => manager.division === division.id).map(({ manager }) => manager),
    }), {});

    const draftByManager = draft.reduce((prev, { manager }) => ({
      ...prev,
      [manager]: draft.filter((pick) => pick.manager === manager).map(({ player }) => player),
    }), {});

    const playersByDivisions = divisions.reduce((prev, division) => ({
      ...prev,
      [division.id]: managers
        .filter((manager) => manager.division === division.id)
        .reduce((prevList, { manager }) => ([...prevList, ...draftByManager[manager] || []]), []),
    }), {});

    return {
      managers,
      divisions,
      draftPremierLeague,
      draftChampionship,
      draftLeagueOne,
      byDivisions: {
        managers: managersByDivisions, // { Championship: ['managers'], ...}
        draft: playersByDivisions, // { Championship: ['players'], ...}
      },
      byManager: {
        draft: draftByManager, // { ManagerA: ['players'], ...}
      },
    };
  },
);
