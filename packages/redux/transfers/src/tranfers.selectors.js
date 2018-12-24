import { createSelector } from 'reselect';
import Transfers from '@kammy-ui/helpers.transfers';
import get from '@kammy-ui/helpers.get';

const transfersSelector = (state, division) => get(state, `transfers.${division}.transfers`) || [];
const statusSelector = (state, division) => get(state, `transfers.${division}.status`) || {};
const savingSelector = (state) => get(state, 'transfers.saving') || false;

export const getTransfers = createSelector(
  transfersSelector,
  (transfers) => (new Transfers({ transfers })));

export const getValidTransfers = createSelector(
  getTransfers,
  (transfers) => ({ transfers: transfers.validRequests }));

export const getStatus = createSelector(
  statusSelector,
  savingSelector,
  (status, saving) => ({ ...status, saving }),
);
