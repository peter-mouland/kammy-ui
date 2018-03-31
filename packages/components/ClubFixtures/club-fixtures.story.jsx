import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, array } from '@storybook/addon-knobs';

import fixtures from './club-fixtures.json';
import ClubFixtures from './src/ClubFixtures';

const data = { name: 'Courtois, Thibaut', club: 'Chelsea', code: 1058 };

storiesOf('Components', module)
  .add('ClubFixtures', () => (
    <ClubFixtures
      code={text('code', data.code)}
      club={text('club', data.club)}
      fixtures={array('fixtures', fixtures)}
    />
  ));
