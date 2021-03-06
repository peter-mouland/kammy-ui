/* eslint-disable react/no-deprecated */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import ErrorBoundary from '@kammy-ui/error-boundary';

import PlayersPageTable from './PlayersPage.table';

const bem = bemHelper({ block: 'players-page' });

class PlayersPage extends React.Component {
  componentDidMount() {
    const {
      fetchDbPlayers, fetchSkySportsPlayers, fetchSpreadsheetPlayers,
      dbPlayersLoaded, skySportsLoaded, spreadsheetLoaded,
    } = this.props;
    if (!dbPlayersLoaded) fetchDbPlayers();
    if (!skySportsLoaded) fetchSkySportsPlayers();
    if (!spreadsheetLoaded) fetchSpreadsheetPlayers();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dbImporting === true && !nextProps.dbImporting) {
      this.props.fetchDbPlayers();
    }
  }

  setupPlayers = () => {
    this.props.mergePlayers();
  };

  render() {
    const {
      dbPlayersLoading, dbPlayersCount, loaded, dbImporting, dbPlayersArray,
      spreadsheetLoading, spreadsheetPlayersCount,
      skySportsLoading, skySportsPlayersCount,
    } = this.props;

    return (
      <section id="players-page" className={bem(null, 'page-content')}>
        <h1>Players</h1>
        <p>
          The purpose of this page is to display the Players stats from the Google Spreadsheet,
          import new player data from SkySports, add see the differences highlighted.
        </p>
        <p>
          From here, the updates should be Saved to Database and, optionally,
          be copied back to google spreadsheet.
        </p>
        <p>
          Players In DB :
          {dbPlayersLoading ? <Interstitial /> : dbPlayersCount}
        </p>
        <p>
          Players In SkySports :
          {skySportsLoading ? <Interstitial /> : skySportsPlayersCount}
        </p>
        <p>
          Players In Google Spreadsheets :
          {spreadsheetLoading ? <Interstitial /> : spreadsheetPlayersCount}
        </p>
        {loaded && (
          <Fragment>
            <p>
              {dbPlayersCount < skySportsPlayersCount && (
                <div>{skySportsPlayersCount - dbPlayersCount} New Sky Sports players !</div>
              )}
              <button onClick={this.setupPlayers} disabled={dbImporting}>
                Import/Update Players<sup>*</sup>
              </button>
              { dbImporting && <Interstitial /> }
            </p>
            <p>
              <sup>*</sup>this will copy players from Sky Sports into the Database.
              It will also attempt to assign a position if the player is found within Google Spreadsheets.
            </p>
          </Fragment>
        )}
        {dbPlayersCount > 0 && (
          <ErrorBoundary>
            <PlayersPageTable players={dbPlayersArray} />
          </ErrorBoundary>
        )}
      </section>
    );
  }
}

PlayersPage.propTypes = {
  mergePlayers: PropTypes.func.isRequired,
  mergedPlayers: PropTypes.object,
  loaded: PropTypes.bool,

  fetchSkySportsPlayers: PropTypes.func,
  skySportsLoading: PropTypes.bool,
  skySportsLoaded: PropTypes.bool,
  skySportsPlayers: PropTypes.object,
  skySportsPlayersCount: PropTypes.number,

  fetchDbPlayers: PropTypes.func,
  dbImporting: PropTypes.bool,
  dbPlayersLoading: PropTypes.bool,
  dbPlayersLoaded: PropTypes.bool,
  dbPlayersArray: PropTypes.array,
  dbPlayersCount: PropTypes.number,

  fetchSpreadsheetPlayers: PropTypes.func,
  spreadsheetLoading: PropTypes.bool,
  spreadsheetLoaded: PropTypes.bool,
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
  dbPlayersLoading: false,
  dbPlayersLoaded: false,
  dbPlayersArray: [],
  dbPlayersCount: null,
  skySportsLoading: false,
  skySportsLoaded: false,
  skySportsPlayers: {},
  skySportsPlayersCount: null,
  spreadsheetLoading: false,
  spreadsheetLoaded: false,
  spreadsheetPlayers: {},
  spreadsheetPlayersCount: null,
};

export default PlayersPage;
