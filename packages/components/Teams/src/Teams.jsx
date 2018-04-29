import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import './teams.scss';

const bem = bemHelper({ block: 'teams' });

// const teams = ['team a', 'team b', 'team c'];

class Teams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDivision: props.divisions[0],
    };
  }

  changeLeague = (league) => {
    this.setState({
      selectedDivision: league,
    });
  };

  render() {
    const { selectedDivision } = this.state;
    const { divisions } = this.props;

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

Teams.propTypes = {
  divisions: PropTypes.arrayOf(PropTypes.string),
};

Teams.defaultProps = {
  divisions: ['Premiership', 'Championship', 'League 1'],
};

export default Teams;
