import React from 'react';
// import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import './teamsPage.scss';

const bem = bemHelper({ block: 'teams-page' });

const divisions = ['Premiership', 'Championship', 'League 1'];
// const teams = ['team a', 'team b', 'team c'];

class TeamsPage extends React.Component {
  state = {
    selectedDivision: divisions[0],
  };

  changeLeague = (league) => {
    this.setState({
      selectedDivision: league,
    });
  };

  render() {
    const { selectedDivision } = this.state;
    return (
      <div className={bem()} id="teams-page">
        <h1>Divisions</h1>
        <MultiToggle
          id={'divisions'}
          checked={selectedDivision}
          options={divisions}
          onChange={this.changeLeague}
        />
      </div>
    );
  }
}

export default TeamsPage;
