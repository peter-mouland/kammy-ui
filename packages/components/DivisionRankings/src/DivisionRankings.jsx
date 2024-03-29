import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
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
      fetchAllPlayerData, fetchDivision, fetchGameWeeks,
      playersLoaded, divisionLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchAllPlayerData();
    if (!divisionLoaded) fetchDivision(divisionId);
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  handleRowHover = (manager) => {
    this.setState({ highlightManager: manager });
  }

  render() {
    const {
      loaded, lineChartData, label, managersSeason, managersPoints, managersRankChange, managersRank, lineType,
      showStandings, showWeekly, showChart, showGameWeekSwitcher, managers,
    } = this.props;
    const { highlightManager } = this.state;

    return (
      <section id="division-ranking-page" className={bem(null, null, 'page-content')} data-b-layout="container">
        <h1>{label}</h1>
        {
          loaded && showGameWeekSwitcher && <div style={{ position: 'relative', zIndex: 2 }}><GameWeekSwitcher /></div>
        }
        {
          <div style={{ position: 'relative', zIndex: 1 }}>
            {showStandings && (
              <Fragment>
                {showWeekly && <h2 data-b-layout="v-space">Overall Standings</h2>}
                <div data-b-layout="row vpad">
                  <Table
                    managers={managers}
                    points={managersPoints}
                    rank={managersRank}
                    type='season'
                    handleRowHover={this.handleRowHover}
                  />
                </div>
              </Fragment>
            )}
            {showWeekly && (
              <Fragment>
                <div data-b-layout="row vpad">
                  {showStandings && <h2>Weekly Scores</h2>}
                  <Table
                    managers={managers}
                    points={managersPoints}
                    rank={managersRankChange}
                    type='gameWeek'
                  />
                </div>
              </Fragment>
            )}
            {showChart && (
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
            )}
          </div>
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
  managers: PropTypes.array,
  managersSeason: PropTypes.object,
  managersPoints: PropTypes.array,
  managersRank: PropTypes.object,
  managersRankChange: PropTypes.object,
  lineChartData: PropTypes.array,

  fetchAllPlayerData: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  fetchDivision: PropTypes.func.isRequired,

  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  divisionLoaded: PropTypes.bool,
  showGameWeekSwitcher: PropTypes.bool,
  showWeekly: PropTypes.bool,
  showChart: PropTypes.bool,
  showStandings: PropTypes.bool,
};

DivisionRankings.defaultProps = {
  lineType: undefined,
  managersSeason: {},
  loaded: false,
  managers: [],
  managersPoints: [],
  playersLoaded: false,
  gameWeeksLoaded: false,
  divisionLoaded: false,
  showGameWeekSwitcher: true,
  showWeekly: true,
  showChart: true,
  showStandings: true,
  gameWeeksCount: null,
};

DivisionRankings.contextTypes = {
  appConfig: PropTypes.object,
};

export default DivisionRankings;
