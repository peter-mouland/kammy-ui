import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionTable from '@kammy-ui/division-table';

const bem = bemHelper({ block: 'teams-page' });

const ChampionshipTable = () => (
  <section id="teams-page" className={bem()}>
    <DivisionTable
      label={'Championship'}
      divisionId={'championship'}
    />
  </section>
);

export default ChampionshipTable;
