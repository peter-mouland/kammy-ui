import React from 'react';
// import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import './teamsPage.scss';

const bem = bemHelper({ block: 'teams-page' });

const leagues = ['Premiership', 'Championship', 'League 1'];
// const teams = ['team a', 'team b', 'team c'];

class TeamsPage extends React.Component {
  state = {
    selectedLeague: leagues[0],
  };

  changeLeague = (league) => {
    this.setState({
      selectedLeague: league,
    });
  };

  render() {
    const { selectedLeague } = this.state;
    return (
      <div className={bem()} id="teams-page">
        <h1>Leagues</h1>
        <MultiToggle
          id={'leagues'}
          checked={selectedLeague}
          options={leagues}
          onChange={this.changeLeague}
        />
      </div>
    );
  }
}

export default TeamsPage;
