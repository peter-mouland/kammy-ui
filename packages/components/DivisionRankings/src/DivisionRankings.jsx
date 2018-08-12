import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import Table from './DivisionRankings.table';
import FormattedGameWeekDate from './components/FormattedGameWeekDate';
import getDivisionPoints from './lib/calculate-division-points';
import getDivisionRank from './lib/calculate-division-rank';
import getRankChange from './lib/calculate-rank-change';
import Chart from './components/chart';

const bem = bemHelper({ block: 'division-stats' });

class DivisionRankings extends React.Component {
  state = { }

  constructor(props) {
    super(props);
    const currentGameWeek = props.gameWeeks.filter((gw) => (
      new Date() < new Date(gw.end) && new Date() > new Date(gw.start)
    )).length;
    this.state.displayGw = String(currentGameWeek + 1);
  }

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

  updateDisplayGw = (displayGw) => {
    this.setState({ displayGw });
  }

  render() {
    const {
      loaded, gameWeeks, label, teams, managersSeason,
    } = this.props;
    const { displayGw } = this.state;
    const gameWeek = parseInt(displayGw, 10) - 1 < 0 ? 0 : parseInt(displayGw, 10) - 1;

    const points = loaded && teams && getDivisionPoints(teams, managersSeason, gameWeek);
    const rank = points && getDivisionRank(points);
    const pointsLastWeek = loaded && teams && gameWeek > 0 && getDivisionPoints(teams, managersSeason, gameWeek - 1);
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
          loaded && teams && points && rank && (
            <Fragment>
              <MultiToggle
                label={'GameWeek'}
                id={'GameWeek'}
                checked={displayGw}
                options={gameWeeks.map((gw) => gw.gameWeek)}
                onChange={this.updateDisplayGw}
                contextualHelp={(value) => <FormattedGameWeekDate gameWeek={gameWeeks[value - 1]}/>}
              />
              <FormattedGameWeekDate gameWeek={gameWeeks[gameWeek]}/>
              <h2>Overall Standings</h2>
              <Table
                points={points}
                rank={rank}
                type='season'
              />
              <Chart
                teams={teams}
                gameWeeks={gameWeeks}
                managersSeason={managersSeason}
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
