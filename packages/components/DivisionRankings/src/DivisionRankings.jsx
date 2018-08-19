import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import GameWeekSwitcher from '@kammy-ui/game-week-switcher';

import Table from './DivisionRankings.table';
import getDivisionPoints from './lib/calculate-division-points';
import getDivisionRank from './lib/calculate-division-rank';
import getRankChange from './lib/calculate-rank-change';
import Chart from './components/chart';

const bem = bemHelper({ block: 'division-stats' });

class DivisionRankings extends React.Component {
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
      loaded, gameWeeks, label, teams, managersSeason, selectedGameWeek,
    } = this.props;

    const points = loaded && teams && getDivisionPoints(teams, managersSeason, selectedGameWeek);
    const rank = points && getDivisionRank(points);
    const pointsLastWeek = selectedGameWeek > 0 && getDivisionPoints(teams, managersSeason, selectedGameWeek - 1);
    const rankLastWeek = pointsLastWeek && getDivisionRank(pointsLastWeek);
    const rankChange = getRankChange(rankLastWeek, rank);
    return (
      <section id="division-ranking-page" className={bem(null, null, 'page-content')}>
        <h1>{label}</h1>
        {!loaded && (
          <Fragment>
            <Interstitial /> Data Gathering...
          </Fragment>
        )}
        {
          loaded && <GameWeekSwitcher />
        }
        {
          loaded && teams && points && rank && (
            <Fragment>
              <h2>Overall Standings</h2>
              <Chart
                teams={teams}
                gameWeeks={gameWeeks.slice(0, selectedGameWeek)}
                managersSeason={managersSeason}
              />
              <Table
                points={points}
                rank={rank}
                type='season'
              />
              <h2>Weekly Scores</h2>
              <Table
                points={points}
                rank={rankChange}
                type='gameWeek'
              />
            </Fragment>
          )
        }
      </section>
    );
  }
}

DivisionRankings.propTypes = {
  selectedGameWeek: PropTypes.number,
  loaded: PropTypes.bool,
  players: PropTypes.object,
  transfers: PropTypes.object,
  gameWeeks: PropTypes.array,
  teams: PropTypes.object,
  divisionId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  managersSeason: PropTypes.object.isRequired,

  fetchDbPlayers: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  fetchDivision: PropTypes.func.isRequired,

  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  transfersLoaded: PropTypes.bool,
  divisionLoaded: PropTypes.bool,
};

DivisionRankings.defaultProps = {
  selectedGameWeek: 0,
  loaded: false,
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
  teams: {},
};

DivisionRankings.contextTypes = {
  appConfig: PropTypes.object,
};

export default DivisionRankings;
