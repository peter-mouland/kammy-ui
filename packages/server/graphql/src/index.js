import { graphql } from 'graphql';
import { rootActions, connect } from '@kammy-ui/database';

import schema from './graphql.schema';
import { mergePlayers } from './custom/mergePlayers';
import getCup from './models/cup.model';
import getDivision from './models/division.model';
import getGameWeeks from './models/game-week.model';

connect(process.env.MONGODB_URI || 'mongodb://localhost/kammy-ui');

const { getPlayers, upsertPlayers } = rootActions();

const root = {
  mergePlayers,
  getPlayers,
  upsertPlayers,
  getDivision,
  getCup,
  getGameWeeks,
};

export default ({ query, variables }) => graphql(schema, query, root, {}, variables);
