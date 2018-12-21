import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const transfersSelector = (state, division) => get(state, `transfers.${division}.transfers`) || [];
const statusSelector = (state, division) => get(state, `transfers.${division}.status`) || {};
const savingSelector = (state) => get(state, 'transfers.saving') || false;

export const getTransfers = createSelector(
  transfersSelector,
  (transfers) => ({ transfers }));

export const getValidTransfers = createSelector(
  transfersSelector,
  (transfers) => ({ transfers: transfers.filter((transfer) => transfer.status === 'Y') }));

export const getStatus = createSelector(
  statusSelector,
  savingSelector,
  (status, saving) => ({ ...status, saving }),
);
