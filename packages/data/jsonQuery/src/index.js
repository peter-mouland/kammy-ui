import React from 'react';
import jsonQuery from 'json-query';

import hart from '../fixtures/player-stats-1001.json';
// const degea = require('../fixtures/player-stats-1002');

const player = 1001;
const playerStart = new Date('2018-01-01 16:00:00');
const playerEnd = new Date('2018-04-01 16:00:00');

const playerFixtures = jsonQuery('fixtures[*status!=PENDING][*:date]', {
  data: hart,
  locals: {
    date(item) {
      const fixtureDate = new Date(item.date);
      return fixtureDate <= playerEnd && fixtureDate >= playerStart;
    },
  },
});

const result = playerFixtures.value.reduce((prev, curr) => {
  const [c1, c2, c3] = curr.stats;
  const [c1p, c2p, c3p] = prev;
  return [c1 + c1p, c2 + c2p, c3 + c3p];
}, []);


const show = () => (
  <pre>
    {JSON.stringify(playerFixtures.value, null, 2)}
  </pre>
);

export default show;
