import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionTable from '@kammy-ui/division-table';

const bem = bemHelper({ block: 'teams-page' });

const LeagueOneTable = () => (
  <section id="teams-page" className={bem()}>
    <DivisionTable
      label={'League One'}
      divisionId={'leagueOne'}
    />
  </section>
);

export default LeagueOneTable;
