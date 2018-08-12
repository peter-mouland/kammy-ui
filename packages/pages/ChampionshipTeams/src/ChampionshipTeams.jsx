import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionStats from '@kammy-ui/division-stats';

const bem = bemHelper({ block: 'teams-page' });

const ChampionshipTeams = () => (
  <section id="teams-page" className={bem()}>
    <DivisionStats
      label={'Championship: Teams'}
      divisionId={'championship'}
    />
  </section>
);

export default ChampionshipTeams;
