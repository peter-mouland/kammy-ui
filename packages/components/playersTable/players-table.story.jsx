import React from 'react';
import { storiesOf } from '@storybook/react';
import { array } from '@storybook/addon-knobs';

import fixtures from './players-table.fixtures.json';
import Players from './src/Players';

const visibleColumns = ['apps', 'subs', 'gls', 'asts', 'cs', 'con', 'pensv', 'tb', 'sb', 'ycard', 'rcard', 'points'];
const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR', 'SUB'];

storiesOf('Components', module)
  .add('PlayersTable', () => (
    <Players
      players={fixtures.players}
      visibleColumns={array('visibleColumns', visibleColumns)}
      positions={positions}
    />
  ));
