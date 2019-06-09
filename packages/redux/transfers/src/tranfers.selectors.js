import { createSelector } from 'reselect';
import Transfers from '@kammy-ui/helpers.transfers';
import get from '@kammy-ui/helpers.get';

const premierLeagueSelector = (state) => get(state, 'transfers.premierLeague.transfers') || [];
const championshipSelector = (state) => get(state, 'transfers.championship.transfers') || [];
const leagueOneSelector = (state) => get(state, 'transfers.leagueOne.transfers') || [];
const transfersSelector = (state, division) => get(state, `transfers.${division}.transfers`) || [];
const statusSelector = (state, division) => get(state, `transfers.${division}.status`) || {};
const savingSelector = (state) => get(state, 'transfers.saving') || false;

export const premierLeagueTransfers = createSelector(premierLeagueSelector, (ts) => new Transfers({ transfers: ts }));
export const championshipTransfers = createSelector(championshipSelector, (ts) => new Transfers({ transfers: ts }));
export const leagueOneTransfers = createSelector(leagueOneSelector, (ts) => new Transfers({ transfers: ts }));
export const getTransfers = createSelector(transfersSelector, (transfers) => (new Transfers({ transfers })));
export const getValidTransfers = createSelector(getTransfers, (ts) => ({ transfers: ts.validRequests }));
export const premierLeagueValid = createSelector(premierLeagueTransfers, (ts) => ({ transfers: ts.validRequests }));
export const championshipValid = createSelector(championshipTransfers, (ts) => ({ transfers: ts.validRequests }));
export const leagueOneValid = createSelector(leagueOneTransfers, (ts) => ({ transfers: ts.validRequests }));

export const getStatus = createSelector(
  statusSelector,
  savingSelector,
  (status, saving) => ({ ...status, saving }),
);
