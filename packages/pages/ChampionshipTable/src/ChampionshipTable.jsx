import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionStats from '@kammy-ui/division-stats';

const bem = bemHelper({ block: 'teams-page' });

const ChampionshipTable = () => (
  <section id="teams-page" className={bem()}>
    <DivisionStats
      label={'Championship'}
      divisionId={'championship'}
    />
  </section>
);

export default ChampionshipTable;
