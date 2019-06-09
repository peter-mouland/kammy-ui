import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import GameWeekSwitcher from '@kammy-ui/game-week-switcher';
import ErrorBoundary from '@kammy-ui/error-boundary';

import Table from './DivisionRankings.table';
import LoadableChart from './components/LoadableChart';

const bem = bemHelper({ block: 'division-stats' });

class DivisionRankings extends React.Component {
  state = { highlightManager: '' }

  componentDidMount() {
    const {
      divisionId,
      fetchAllPlayerData, fetchDivision, fetchTransfers, fetchGameWeeks,
      playersLoaded, divisionLoaded, transfersLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchAllPlayerData();
    if (!divisionLoaded) fetchDivision(divisionId);
    if (!transfersLoaded) fetchTransfers(divisionId);
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  handleRowHover = (manager) => {
    this.setState({ highlightManager: manager });
  }

  render() {
    const {
      loaded, lineChartData, label, managersSeason, managersPoints, managersRankChange, managersRank, lineType,
    } = this.props;
    const { highlightManager } = this.state;
    const showData = loaded && managersPoints && managersRank;
    return (
      <section id="division-ranking-page" className={bem(null, null, 'page-content')} data-b-layout="container">
        <h1>{label}</h1>
        {
          !loaded && <Interstitial message='Data Gathering...' />
        }
        {
          loaded && <div style={{ position: 'relative', zIndex: 2 }}><GameWeekSwitcher /></div>
        }
        {
          showData && (
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 data-b-layout="v-space">Overall Standings</h2>
              <div data-b-layout="row vpad">
                <Table
                  points={managersPoints}
                  rank={managersRank}
                  type='season'
                  handleRowHover={this.handleRowHover}
                />
              </div>
              <div data-b-layout="row vpad">
                <h2>Weekly Scores</h2>
                <Table
                  points={managersPoints}
                  rank={managersRankChange}
                  type='gameWeek'
                />
              </div>
              <ErrorBoundary>
                <div data-b-layout="row vpad">
                  <LoadableChart
                    data={lineChartData}
                    lines={Object.keys(managersSeason)}
                    xAxis={'gameWeek'}
                    highlightManager={highlightManager}
                    lineType={lineType}
                  />
                </div>
              </ErrorBoundary>
            </div>
          )
        }
      </section>
    );
  }
}

DivisionRankings.propTypes = {
  lineType: PropTypes.string,
  loaded: PropTypes.bool,
  divisionId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  managersSeason: PropTypes.object,
  managersPoints: PropTypes.object,
  managersRank: PropTypes.object,
  managersRankChange: PropTypes.object,
  lineChartData: PropTypes.object,

  fetchAllPlayerData: PropTypes.func.isRequired,
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
  loaded: false,
  playersLoaded: false,
  gameWeeksLoaded: false,
  transfersLoaded: false,
  divisionLoaded: false,
  gameWeeksCount: null,
  transfersCount: null,
};

DivisionRankings.contextTypes = {
  appConfig: PropTypes.object,
};

export default DivisionRankings;
