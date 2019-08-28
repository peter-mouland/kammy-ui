import { actions as draftSetupActions } from '@kammy-ui/redux.draft-setup';
import { actions as gameWeeksActions } from '@kammy-ui/redux.game-weeks';
import differenceInHours from 'date-fns/difference_in_hours';
import { setCache, getCache } from '@kammy-ui/cache';

const port = process.env.DEV_PORT || process.env.PORT;
const REFRESH_IN_HOURS = 12;

const prefetch = async (store) => {
  const promises = [];
  const now = Date.now();
  const fetchedOn = getCache('fetchedOn');
  const draftSetupCache = getCache('draftSetup');
  const gameWeeksCache = getCache('gameWeeks');

  if (!fetchedOn || differenceInHours(fetchedOn, now) > REFRESH_IN_HOURS) {
    promises.push(store.dispatch(draftSetupActions.fetchDraftSetup({ port })));
  } else {
    promises.push(store.dispatch(draftSetupCache.action));
  }

  if (!fetchedOn || differenceInHours(fetchedOn, now) > REFRESH_IN_HOURS) {
    promises.push(store.dispatch(gameWeeksActions.fetchGameWeeks({ port })));
  } else {
    promises.push(store.dispatch(gameWeeksCache.action));
  }

  const [draftSetup, gameWeeks] = await Promise.all(promises);

  setCache('fetchedOn', now);
  // only set value the first time (when action is saved properly)
  setCache('draftSetup', draftSetupCache || draftSetup);
  setCache('gameWeeks', gameWeeksCache || gameWeeks);

  return [draftSetup, gameWeeks];
};

export default prefetch;
