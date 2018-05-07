import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import PlayersFilters from '@kammy-ui/players-table/src/PlayersFilters';
import PlayersTable from '@kammy-ui/players-table/src/PlayersTable';

const bem = bemHelper({ block: 'teams-page' });

const PLAYERS_SPREADSHEET_ID = '1x2qD0aS6W-MeARu6QT0YthgLV91-Hmlip5_Gut2nEBI';
const PLAYERS_WORKSHEET_NAME = 'Players';
const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];

class TeamsPage extends React.Component {
  componentDidMount() {
    this.props.fetchDbPlayers();
    this.props.fetchSkySportsPlayers();
    this.props.fetchSpreadsheetPlayers(PLAYERS_SPREADSHEET_ID, PLAYERS_WORKSHEET_NAME);
  }

  copySkySportToDB = () => {
    this.props.importPlayers();
  };

  fetchDbPlayers = () => {
    this.props.fetchDbPlayers();
  };

  fetchSkySportsPlayers = () => {
    this.props.fetchSkySportsPlayers();
  };

  fetchSpreadsheetPlayers = () => {
    this.props.fetchSpreadsheetPlayers(PLAYERS_SPREADSHEET_ID, PLAYERS_WORKSHEET_NAME);
  };

  render() {
    const {
      dbLoading, dbPlayersCount, dbLoaded,
      spreadsheetLoading, spreadsheetPlayers, spreadsheetPlayersCount, spreadsheetLoaded,
      skySportsLoading, skySportsPlayers, skySportsPlayersCount, skySportsLoaded,
    } = this.props;
    const allPlayers = {
      ...spreadsheetPlayers,
      ...skySportsPlayers,
    };
    const mergedPlayers = Object.keys(allPlayers).reduce((prev, key) => ({
      ...prev,
      [key]: {
        pos: '', // pos is required but doesn't exist on skysports players
        ...spreadsheetPlayers && spreadsheetPlayers[key],
        ...skySportsPlayers && skySportsPlayers[key],
        // hidden: !spreadsheetPlayers[key],
        // new: !spreadsheetPlayers || !spreadsheetPlayers[key],
        season: {},
        gameWeek: {},
      },
    }), {});
    const mergedPlayersArray = Object.keys(mergedPlayers).map((player) => mergedPlayers[player]);
    const mismatch = (player) => {
      const skyPlayer = skySportsPlayers[player.name] || {};
      const spreadsheetPlayer = spreadsheetPlayers[player.name] || {};
      const filter = String(skyPlayer.code) === String(spreadsheetPlayer.code) &&
        skyPlayer.club === spreadsheetPlayer.club && spreadsheetPlayers[player.name];
      return !filter;
    };
    // const loading = (dbLoading && skySportsLoading && spreadsheetLoading);
    const loaded = (dbLoaded && skySportsLoaded && spreadsheetLoaded);


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
            <h3>Next Steps</h3>
            <div>
              {dbPlayersCount === 0 && skySportsPlayersCount > 0 && (
                <p>
                  No players in DB! <br/>
                  Looks like you need to import some players...
                  <button onClick={this.copySkySportToDB}>Copy SkySports to DB</button>
                </p>
              )}
            </div>
          </div>
        )}
        <div className="page-content">

          <PlayersFilters
            players={mergedPlayersArray}
            positions={positions}
            customFilter={{ fn: mismatch, label: 'Show only mis-matches' }}
          >
            {(playersFiltered) => (
              <PlayersTable
                editable
                positions={positions}
                players={playersFiltered}
                additionalColumns={['skySportPosition']}
                visibleColumns={[]}
              />
            )}
          </PlayersFilters>

          <h4>Todo:hookup button</h4>
          <p>
            <button className={'warning'}>Update the DataBase</button>
          </p>

        </div>
      </section>
    );
  }
}

TeamsPage.propTypes = {
  importPlayers: PropTypes.func.isRequired,

  fetchSkySportsPlayers: PropTypes.func,
  skySportsLoading: PropTypes.bool,
  skySportsLoaded: PropTypes.bool,
  skySportsPlayers: PropTypes.object,
  skySportsPlayersCount: PropTypes.number,

  fetchDbPlayers: PropTypes.func,
  dbLoading: PropTypes.bool,
  dbLoaded: PropTypes.bool,
  dbPlayers: PropTypes.array,
  dbPlayersCount: PropTypes.number,

  fetchSpreadsheetPlayers: PropTypes.func,
  spreadsheetLoading: PropTypes.bool,
  spreadsheetLoaded: PropTypes.bool,
  spreadsheetPlayers: PropTypes.object,
  spreadsheetPlayersCount: PropTypes.number,
};

TeamsPage.defaultProps = {
  fetchDbPlayers: () => {},
  fetchSkySportsPlayers: () => {},
  fetchSpreadsheetPlayers: () => {},
  dbLoading: false,
  dbLoaded: false,
  dbPlayers: [],
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

export default TeamsPage;
