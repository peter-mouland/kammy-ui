import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import GameWeekSwitcher from '@kammy-ui/game-week-switcher';
import ErrorBoundary from '@kammy-ui/error-boundary';

import Table from './DivisionRankings.table';
import getDivisionPoints from './lib/calculate-division-points';
import getDivisionRank from './lib/calculate-division-rank';
import getRankChange from './lib/calculate-rank-change';
import LoadableChart from './components/LoadableChart';

const bem = bemHelper({ block: 'division-stats' });

const makeLineChartData = (teams, gameWeeks, managersSeason) => (
  gameWeeks.map(({ gameWeek }, i) => {
    const points = getDivisionPoints(teams, managersSeason, i);
    const rank = getDivisionRank(points);
    return {
      gameWeek: `gw${gameWeek}`,
      ...rank.total,
    };
  })
);

class DivisionRankings extends React.Component {
  state = { highlightManager: '' }

  componentDidMount() {
    const {
      divisionId,
      fetchDbPlayers, fetchDivision, fetchTransfers, fetchGameWeeks,
      playersLoaded, divisionLoaded, transfersLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchDbPlayers();
    if (!divisionLoaded) fetchDivision(divisionId);
    if (!transfersLoaded) fetchTransfers(divisionId);
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  handleRowHover = (manager) => {
    this.setState({ highlightManager: manager });
  }

  render() {
    const {
      loaded, gameWeeks, label, teams, managersSeason, selectedGameWeek, lineType,
    } = this.props;
    const { highlightManager } = this.state;

    const gameWeekIdx = selectedGameWeek - 1;
    const points = loaded && teams && getDivisionPoints(teams, managersSeason, gameWeekIdx);
    const pointsLastWeek = loaded
      && selectedGameWeek > 0 && getDivisionPoints(teams, managersSeason, gameWeekIdx - 1);
    const data = loaded && makeLineChartData(teams, gameWeeks.slice(0, selectedGameWeek), managersSeason);
    const rank = points && getDivisionRank(points);
    const rankLastWeek = pointsLastWeek && getDivisionRank(pointsLastWeek);
    const rankChange = getRankChange(rankLastWeek, rank);
    const showData = loaded && teams && points && rank;
    return (
      <section id="division-ranking-page" className={bem(null, null, 'page-content')}>
        <h1>{label}</h1>
        {
          !loaded && <Interstitial message='Data Gathering...' />
        }
        {
          loaded && <GameWeekSwitcher />
        }
        {
          showData && (
            <Fragment>
              <h2>Overall Standings</h2>
              <ErrorBoundary>
                <LoadableChart
                  data={data}
                  lines={Object.keys(managersSeason)}
                  xAxis={'gameWeek'}
                  highlightManager={highlightManager}
                  lineType={lineType}
                />
              </ErrorBoundary>
              <Table
                points={points}
                rank={rank}
                type='season'
                handleRowHover={this.handleRowHover}
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
  lineType: PropTypes.string,
  selectedGameWeek: PropTypes.number,
  loaded: PropTypes.bool,
  players: PropTypes.object,
  transfers: PropTypes.object,
  gameWeeks: PropTypes.array,
  teams: PropTypes.object,
  divisionId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  managersSeason: PropTypes.object,

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
  lineType: '0',
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
