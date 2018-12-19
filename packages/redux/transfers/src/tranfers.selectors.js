import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const transfersSelector = (state, division) => get(state, `transfers.${division}`) || [];
const statusSelector = (state, division) => get(state, 'transfers.status');

export const getTransfers = createSelector(
  transfersSelector,
  (transfers) => ({ transfers }));

export const getValidTransfers = createSelector(
  transfersSelector,
  (transfers) => ({ transfers: transfers.filter((transfer) => transfer.status === 'Y') }));

export const getStatus = createSelector(
  statusSelector,
  (status) => status,
);
