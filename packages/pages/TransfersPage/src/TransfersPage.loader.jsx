import React from 'react';
import PropTypes from 'prop-types';

import TransfersPage from './TransfersPage';

class TransfersPageLoader extends React.Component {
  componentDidMount() {
    const {
      fetchPlayers, fetchTransfers, fetchGameWeeks, playersLoaded, transfersLoaded, gameWeeksLoaded,
      fetchCurrentTeams, division, teamsLoaded,
    } = this.props;

    if (!teamsLoaded) fetchCurrentTeams(division);
    if (!playersLoaded) fetchPlayers();
    if (!transfersLoaded) fetchTransfers(division);
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  render() {
    return (
      <TransfersPage { ...this.props} />
    );
  }
}

TransfersPageLoader.propTypes = {
  division: PropTypes.string.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  fetchCurrentTeams: PropTypes.func.isRequired,
  teamsLoaded: PropTypes.bool,
  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  transfersLoaded: PropTypes.bool,
};

TransfersPageLoader.defaultProps = {
  teamsLoaded: false,
  playersLoaded: false,
  gameWeeksLoaded: false,
  transfersLoaded: false,
};

TransfersPageLoader.contextTypes = {
  appConfig: PropTypes.object,
};

export default TransfersPageLoader;
