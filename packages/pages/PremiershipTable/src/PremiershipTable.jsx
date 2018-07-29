import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionTable from '@kammy-ui/division-table';

const bem = bemHelper({ block: 'teams-page' });

const PremiershipTable = () => (
  <section id="teams-page" className={bem()}>
    <DivisionTable
      label={'Premiership'}
      divisionId={'premiership'}
    />
  </section>
);

export default PremiershipTable;
