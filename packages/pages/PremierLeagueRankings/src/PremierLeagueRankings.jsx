import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionRankings from '@kammy-ui/division-rankings';

const bem = bemHelper({ block: 'teams-page' });

const PremierLeagueRankings = () => (
  <section id="teams-page" className={bem()}>
    <DivisionRankings
      label={'Premier League'}
      divisionId={'premierLeague'}
    />
  </section>
);

export default PremierLeagueRankings;
