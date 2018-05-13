import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';

import TeamsTable from './TeamsPage.table';

const bem = bemHelper({ block: 'teams-page' });

class TeamsPage extends React.Component {
  componentDidMount() {
    this.props.fetchDbPlayers();
    this.props.fetchTeams();
    this.props.fetchTransfers();
    this.props.fetchGameWeeks();
    this.props.fetchSpreadsheetPlayers();
  }

  render() {
    const {
      dbLoading, dbPlayers, dbPlayersCount, dbLoaded,
      spreadsheetTeamsLoading, spreadsheetTeams, spreadsheetTeamsCount, spreadsheetTeamsLoaded,
      spreadsheetPlayersLoading, spreadsheetPlayers, spreadsheetPlayersCount, spreadsheetPlayersLoaded,
      spreadsheetGameWeeksLoading, spreadsheetGameWeeks, spreadsheetGameWeeksCount, spreadsheetGameWeeksLoaded,
      spreadsheetTransfersLoading, spreadsheetTransfers, spreadsheetTransfersCount, spreadsheetTransfersLoaded,
    } = this.props;

    const loaded = (
      dbLoaded
      && spreadsheetGameWeeksLoaded
      && spreadsheetTransfersLoaded
      && spreadsheetTeamsLoaded
      && spreadsheetPlayersLoaded
    );
    console.log({ dbPlayers });
    return (
      <section id="teams-page" className={bem()}>
        <h1>Teams</h1>
        <div>
          <p>
            The purpose of this page is to display the Managers Team stats.
          </p>
          <p>
            Combining the SkySport stats with the Spreadsheet Team Sheet we can output GameWeek Score and Season Score
          </p>
        </div>
        <div className="page-content">
          <h3>Data Gathering...</h3>
          <div>
            <p>
              Players :
              {dbLoading ? <Interstitial /> : dbPlayersCount}
            </p>
            <p>
              GameWeeks :
              {spreadsheetGameWeeksLoading ? <Interstitial /> : spreadsheetGameWeeksCount}
            </p>
            <p>
              Transfers :
              {spreadsheetTransfersLoading ? <Interstitial /> : spreadsheetTransfersCount}
            </p>
            <p>
              Teams :
              {spreadsheetTeamsLoading ? <Interstitial /> : spreadsheetTeamsCount}
            </p>
            <p>
              Players :
              {spreadsheetPlayersLoading ? <Interstitial /> : spreadsheetPlayersCount}
            </p>
          </div>
        </div>
        {
          loaded && (
            <TeamsTable
              dbPlayers={dbPlayers}
              spreadsheetTeams={spreadsheetTeams}
              spreadsheetPlayers={spreadsheetPlayers}
              spreadsheetGameWeeks={spreadsheetGameWeeks}
              spreadsheetTransfers={spreadsheetTransfers}
            />
          )
        }
      </section>
    );
  }
}

TeamsPage.propTypes = {
  fetchDbPlayers: PropTypes.func,
  dbLoading: PropTypes.bool,
  dbLoaded: PropTypes.bool,
  dbPlayers: PropTypes.object,
  dbPlayersCount: PropTypes.number,

  fetchSpreadsheetPlayers: PropTypes.func,
  spreadsheetPlayersLoading: PropTypes.bool,
  spreadsheetPlayersLoaded: PropTypes.bool,
  spreadsheetPlayers: PropTypes.object,
  spreadsheetPlayersCount: PropTypes.number,

  fetchGameWeeks: PropTypes.func,
  spreadsheetGameWeeksLoading: PropTypes.bool,
  spreadsheetGameWeeksLoaded: PropTypes.bool,
  spreadsheetGameWeeks: PropTypes.array,
  spreadsheetGameWeeksCount: PropTypes.number,

  fetchTransfers: PropTypes.func,
  spreadsheetTransfersLoading: PropTypes.bool,
  spreadsheetTransfersLoaded: PropTypes.bool,
  spreadsheetTransfers: PropTypes.object,
  spreadsheetTransfersCount: PropTypes.number,

  fetchTeams: PropTypes.func,
  spreadsheetTeamsLoading: PropTypes.bool,
  spreadsheetTeamsLoaded: PropTypes.bool,
  spreadsheetTeams: PropTypes.object,
  spreadsheetTeamsCount: PropTypes.number,
};

TeamsPage.defaultProps = {
  fetchDbPlayers: () => {},
  fetchTransfers: () => {},
  fetchGameWeeks: () => {},
  fetchSpreadsheetPlayers: () => {},
  dbLoading: false,
  dbLoaded: false,
  dbPlayers: {},
  dbPlayersCount: null,
  spreadsheetPlayersLoading: false,
  spreadsheetPlayersLoaded: false,
  spreadsheetPlayers: {},
  spreadsheetPlayersCount: null,
  spreadsheetGameWeeksLoading: false,
  spreadsheetGameWeeksLoaded: false,
  spreadsheetGameWeeks: [],
  spreadsheetGameWeeksCount: null,
  spreadsheetTransfersLoading: false,
  spreadsheetTransfersLoaded: false,
  spreadsheetTransfers: {},
  spreadsheetTransfersCount: null,
  spreadsheetTeamsLoading: false,
  spreadsheetTeamsLoaded: false,
  spreadsheetTeams: {},
  spreadsheetTeamsCount: null,
};

export default TeamsPage;
