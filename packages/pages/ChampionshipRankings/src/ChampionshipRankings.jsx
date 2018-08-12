import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionRankings from '@kammy-ui/division-rankings';

const bem = bemHelper({ block: 'teams-page' });

const ChampionshipRankings = () => (
  <section id="teams-page" className={bem()}>
    <DivisionRankings
      label={'Championship: League Table'}
      divisionId={'championship'}
    />
  </section>
);

export default ChampionshipRankings;
