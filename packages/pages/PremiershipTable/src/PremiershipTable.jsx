import React from 'react';

import bemHelper from '@kammy-ui/bem';
import DivisionStats from '@kammy-ui/division-stats';

const bem = bemHelper({ block: 'teams-page' });

const PremiershipTable = () => (
  <section id="teams-page" className={bem()}>
    <DivisionStats
      label={'Premiership'}
      divisionId={'premiership'}
    />
  </section>
);

export default PremiershipTable;
