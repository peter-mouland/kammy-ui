import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionStats from '@kammy-ui/division-stats';

const bem = bemHelper({ block: 'teams-page' });

const LeagueOneTeams = () => (
  <section id="teams-page" className={bem()}>
    <DivisionStats
      label={'League One'}
      divisionId={'leagueOne'}
    />
  </section>
);

export default LeagueOneTeams;
