import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';

import Table from './DivisionTable.table';

const bem = bemHelper({ block: 'division-table' });

class DivisionTable extends React.Component {
  state = { }

  componentDidMount() {
    const {
      divisionId,
      fetchDbPlayers, fetchDivision, fetchTransfers, fetchGameWeeks,
      playersLoaded, divisionLoaded, transfersLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchDbPlayers();
    if (!divisionLoaded) fetchDivision(divisionId);
    if (!transfersLoaded) fetchTransfers();
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  render() {
    const {
      loaded, gameWeeks, label, division, managersSeason,
    } = this.props;
    return (
      <section id="teams-page" className={bem()}>
        <h1>{label}</h1>
        <div className="page-content">
          {!loaded && (
            <div>
              <Interstitial /> Data Gathering...
            </div>
          )}
          {
            loaded && division && (
              <Table
                managersSeason={managersSeason}
                teams={division}
                gameWeeks={gameWeeks}
              />
            )
          }
        </div>
      </section>
    );
  }
}

DivisionTable.propTypes = {
  loaded: PropTypes.bool,
  players: PropTypes.object,
  transfers: PropTypes.object,
  gameWeeks: PropTypes.array,
  division: PropTypes.object,
  divisionId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  managersSeason: PropTypes.array.isRequired,

  fetchDbPlayers: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  fetchDivision: PropTypes.func.isRequired,

  playersLoading: PropTypes.bool,
  gameWeeksLoading: PropTypes.bool,
  transfersLoading: PropTypes.bool,

  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  transfersLoaded: PropTypes.bool,
  divisionLoaded: PropTypes.bool,
};

DivisionTable.defaultProps = {
  loaded: false,
  playersLoading: false,
  gameWeeksLoading: false,
  transfersLoading: false,
  divisionLoading: false,
  playersLoaded: false,
  gameWeeksLoaded: false,
  transfersLoaded: false,
  divisionLoaded: false,
  transfers: {},
  Players: {},
  PlayersCount: null,
  gameWeeks: [],
  gameWeeksCount: null,
  transfersCount: null,
  division: {},
};

DivisionTable.contextTypes = {
  appConfig: PropTypes.object,
};

export default DivisionTable;