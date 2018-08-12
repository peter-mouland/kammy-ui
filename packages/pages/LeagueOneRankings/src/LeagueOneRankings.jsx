import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionRankings from '@kammy-ui/division-rankings';

const bem = bemHelper({ block: 'teams-page' });

const LeagueOneRankings = () => (
  <section id="teams-page" className={bem()}>
    <DivisionRankings
      label={'League One: League Table'}
      divisionId={'leagueOne'}
    />
  </section>
);

export default LeagueOneRankings;
