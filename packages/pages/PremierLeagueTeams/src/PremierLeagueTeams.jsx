import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionStats from '@kammy-ui/division-stats';

const bem = bemHelper({ block: 'teams-page' });

const PremierLeagueTeams = () => (
  <section id="teams-page" className={bem()}>
    <DivisionStats
      label={'Premier League: Teams'}
      divisionId={'premierLeague'}
    />
  </section>
);

export default PremierLeagueTeams;
