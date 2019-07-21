import { actions } from '@kammy-ui/redux.draft-setup';

const port = process.env.DEV_PORT || process.env.PORT;

const prefetch = (store) => { // eslint-disable-line
  return store.dispatch(actions.fetchDraftSetup({ port }));
};

export default prefetch;
