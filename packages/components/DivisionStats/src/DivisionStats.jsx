import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
// import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import GameWeekSwitcher from '@kammy-ui/game-week-switcher';
import { Cookies } from 'react-cookie';

import Table from './DivisionStats.table';

const bem = bemHelper({ block: 'division-stats' });

class DivisionStats extends React.Component {
  state = { }

  componentDidMount() {
    const {
      divisionId, gameWeeksLoaded, fetchGameWeeks,
      fetchAllPlayerData, fetchDivision,
      playersLoaded, divisionLoaded,
    } = this.props;

    if (!playersLoaded) fetchAllPlayerData();
    if (!divisionLoaded) fetchDivision(divisionId);
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  render() {
    const {
      loaded, label, managersSeason, selectedGameWeek, cookies, managers,
    } = this.props;
    return (
      <section id="teams-page" className={bem()} data-b-layout="container">
        <h1>{label}</h1>
        <div data-b-layout="vpad">
          {loaded && <GameWeekSwitcher />}
        </div>
        <div data-b-layout="vpad">
          <Table
            managers={managers}
            selectedGameWeek={selectedGameWeek}
            managersSeason={managersSeason}
            isAdmin={cookies.get('is-admin') === 'true' || false}
          />
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
  division: PropTypes.object,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  divisionId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  managersSeason: PropTypes.object,

  fetchGameWeeks: PropTypes.func.isRequired,
  fetchAllPlayerData: PropTypes.func.isRequired,
  fetchDivision: PropTypes.func.isRequired,

  playersLoading: PropTypes.bool,

  playersLoaded: PropTypes.bool,
  divisionLoaded: PropTypes.bool,
  managers: PropTypes.array,
};

DivisionStats.defaultProps = {
  selectedGameWeek: 1,
  loaded: false,
  gameWeeksLoaded: false,
  playersLoading: false,
  transfersLoading: false,
  playersLoaded: false,
  transfersLoaded: false,
  divisionLoaded: false,
  transfers: {},
  Players: {},
  PlayersCount: null,
  gameWeeksCount: null,
  managersSeason: null,
  transfersCount: null,
  managers: [],
};

DivisionStats.contextTypes = {
  appConfig: PropTypes.object,
};

export default DivisionStats;
