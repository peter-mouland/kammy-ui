import React from 'react';
// import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';

import './teamsPage.scss';

const bem = bemHelper({ block: 'teams-page' });

const TeamsPage = () => (
  <div className={ bem() } id="teams-page">
    <h1>Teams</h1>
  </div>
);

export default TeamsPage;
