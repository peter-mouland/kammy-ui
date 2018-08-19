import { graphql } from 'graphql';
import { rootActions, connect } from '@kammy-ui/database';

import * as playerQueries from './models/players.client-queries';
import schema from './graphql.schema';
import { mergePlayers } from './custom/mergePlayers';

connect(process.env.MONGODB_URI || 'mongodb://localhost/kammy-ui');

const { getPlayers, upsertPlayers } = rootActions();

const root = {
  mergePlayers,
  getPlayers,
  upsertPlayers,
};

const queries = {
  ...playerQueries,
};

export default ({ query, variables }) => graphql(schema, queries[query] || query, root, {}, variables);
