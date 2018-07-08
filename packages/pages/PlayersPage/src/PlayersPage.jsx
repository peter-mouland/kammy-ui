/* eslint-disable react/no-deprecated */
import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import ErrorBoundary from '@kammy-ui/error-boundary';

import PlayersPageTable from './PlayersPage.table';

const bem = bemHelper({ block: 'players-page' });

class PlayersPage extends React.Component {
  componentDidMount() {
    this.props.fetchDbPlayers();
    this.props.fetchSkySportsPlayers();
    this.props.fetchSpreadsheetPlayers();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dbImporting === true && !nextProps.dbImporting) {
      this.props.fetchDbPlayers();
    }
  }

  setupPlayers = () => {
    this.props.initPlayers();
  };

  render() {
    const {
      dbLoading, dbPlayersCount, loaded, dbImporting, dbPlayers,
      spreadsheetLoading, spreadsheetPlayersCount,
      skySportsLoading, skySportsPlayersCount,
    } = this.props;

    return (
      <section id="players-page" className={bem()}>
        <h1>Players</h1>
        <div>
          <p>
            The purpose of this page is to display the Players stats from the Google Spreadsheet,
            import new player data from SkySports, add see the differences highlighted.
          </p>
          <p>
            From here, the updates should be Saved to Database and, optionally,
            be copied back to google spreadsheet.
          </p>
          <h3>Caution</h3>
          <p>
            Updating player positions will result in scoring changes for that player.
            This should not be done once a player has already been transfered into a team.
          </p>
        </div>
        <div className="page-content">
          <h3>Players Counts</h3>
          <div>
            <p>
              Players In DB :
              {dbLoading ? <Interstitial /> : dbPlayersCount}
            </p>
            <p>
              Players In SkySports :
              {skySportsLoading ? <Interstitial /> : skySportsPlayersCount}
            </p>
            <p>
              Players In Google Spreadsheets :
              {spreadsheetLoading ? <Interstitial /> : spreadsheetPlayersCount}
            </p>
          </div>
        </div>
        {loaded && (
          <div className="page-content">
            <p>
              {dbPlayersCount < skySportsPlayersCount && (
                <div>{skySportsPlayersCount - dbPlayersCount} New Sky Sports players !</div>
              )}
              <button onClick={this.setupPlayers} disabled={dbImporting}>
                Import/Update Player Stats<sup>*</sup>
              </button>
              { dbImporting && <Interstitial /> }
            </p>
            <p>
              <sup>*</sup>this will copy players from Sky Sports into the Database.
              It will also attempt to assign a position if the player is found within Google Spreadsheets.
            </p>
          </div>
        )}
        {dbPlayersCount > 0 && (
          <div className="page-content">
            <ErrorBoundary>
              <PlayersPageTable players={dbPlayers} />
            </ErrorBoundary>
          </div>
        )}
      </section>
    );
  }
}

PlayersPage.propTypes = {
  initPlayers: PropTypes.func.isRequired,
  mergedPlayers: PropTypes.object,
  loaded: PropTypes.bool,

  fetchSkySportsPlayers: PropTypes.func,
  skySportsLoading: PropTypes.bool,
  skySportsPlayers: PropTypes.object,
  skySportsPlayersCount: PropTypes.number,

  fetchDbPlayers: PropTypes.func,
  dbImporting: PropTypes.bool,
  dbLoading: PropTypes.bool,
  dbPlayers: PropTypes.object,
  dbPlayersCount: PropTypes.number,

  fetchSpreadsheetPlayers: PropTypes.func,
  spreadsheetLoading: PropTypes.bool,
  spreadsheetPlayers: PropTypes.object,
  spreadsheetPlayersCount: PropTypes.number,
};

PlayersPage.defaultProps = {
  fetchDbPlayers: () => {},
  fetchSkySportsPlayers: () => {},
  fetchSpreadsheetPlayers: () => {},
  mergedPlayers: {},
  loaded: false,
  dbImporting: false,
  dbLoading: false,
  dbPlayers: {},
  dbPlayersCount: null,
  skySportsLoading: false,
  skySportsPlayers: {},
  skySportsPlayersCount: null,
  spreadsheetLoading: false,
  spreadsheetPlayers: {},
  spreadsheetPlayersCount: null,
};

export default PlayersPage;
