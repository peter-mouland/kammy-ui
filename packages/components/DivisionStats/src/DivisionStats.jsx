import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import GameWeekSwitcher from '@kammy-ui/game-week-switcher';

import Table from './DivisionStats.table';

const bem = bemHelper({ block: 'division-stats' });

class DivisionStats extends React.Component {
  state = { }

  componentDidMount() {
    const {
      divisionId, gameWeeksLoaded, fetchGameWeeks,
      fetchAllPlayerData, fetchDivision, fetchTransfers,
      playersLoaded, divisionLoaded, transfersLoaded,
    } = this.props;

    if (!playersLoaded) fetchAllPlayerData();
    if (!divisionLoaded) fetchDivision(divisionId);
    if (!transfersLoaded) fetchTransfers(divisionId);
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  render() {
    const {
      loaded, label, division, managersSeason, selectedGameWeek,
    } = this.props;

    return (
      <section id="teams-page" className={bem()} data-b-layout="container">
        <h1>{label}</h1>
        <div data-b-layout="vpad">
          {!loaded && (
            <Fragment>
              <Interstitial /> Data Gathering...
            </Fragment>
          )}
          {
            loaded && <GameWeekSwitcher />
          }
        </div>
        <div data-b-layout="vpad">
          {
            loaded && division && (
              <Table
                selectedGameWeek={selectedGameWeek}
                managersSeason={managersSeason}
                teams={division}
              />
            )
          }
        </div>
      </section>
    );
  }
}

DivisionStats.propTypes = {
  selectedGameWeek: PropTypes.number,
  loaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  players: PropTypes.object,
  transfers: PropTypes.array,
  division: PropTypes.object,
  divisionId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  managersSeason: PropTypes.array,

  fetchGameWeeks: PropTypes.func.isRequired,
  fetchAllPlayerData: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  fetchDivision: PropTypes.func.isRequired,

  playersLoading: PropTypes.bool,
  transfersLoading: PropTypes.bool,

  playersLoaded: PropTypes.bool,
  transfersLoaded: PropTypes.bool,
  divisionLoaded: PropTypes.bool,
};

DivisionStats.defaultProps = {
  selectedGameWeek: 1,
  loaded: false,
  gameWeeksLoaded: false,
  playersLoading: false,
  transfersLoading: false,
  divisionLoading: false,
  playersLoaded: false,
  transfersLoaded: false,
  divisionLoaded: false,
  transfers: {},
  Players: {},
  PlayersCount: null,
  gameWeeksCount: null,
  transfersCount: null,
  division: {},
};

DivisionStats.contextTypes = {
  appConfig: PropTypes.object,
};

export default DivisionStats;
