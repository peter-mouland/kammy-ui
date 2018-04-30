import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import bemHelper from '@kammy-ui/bem';
import PlayersFilters from '@kammy-ui/players-table/src/PlayersFilters';
import PlayersTable from '@kammy-ui/players-table/src/PlayersTable';

const bem = bemHelper({ block: 'players-page' });

const PLAYERS_SPREADSHEET_ID = '1x2qD0aS6W-MeARu6QT0YthgLV91-Hmlip5_Gut2nEBI';
const PLAYERS_WORKSHEET_NAME = 'Players';
const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];

class PlayersPage extends React.Component {
  state = {
    skySportsData: {},
    sheetData: {},
    ffData: {},
  };

  componentDidMount() {
    this.props.fetchPlayers();
  }

  fetchSkySportsPlayers = () => {
    this.props.fetchSkySportsPlayers();
  };

  fetchSpreadsheetPlayers = () => {
    this.props.fetchSpreadsheetPlayers(PLAYERS_SPREADSHEET_ID, PLAYERS_WORKSHEET_NAME);
  };

  render() {
    const {
      spreadsheetLoading, skySportsLoading, skySportsPlayers, spreadsheetPlayers,
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

    return (
      <section id="players-page" className={bem()}>
        <h1>Players</h1>
        <div>
          <p>
            The purpose of this page is to display all players with
            SkySports Playing Position and FF Playing Position.
          </p>
          <p>
            From here you can, import new player data from SkySports,
            receive input from GoogleSpreadSheets and save to the FF DataBase.
          </p>
          <h3>Caution</h3>
          <p>
            Updating player positions will result in scoring changes for that player.
            This should not be done once a player has already been transfered into a team.
          </p>
        </div>
        <div className="page-content">
          <h3>Actions</h3>
          <p>
            <button
              disabled={skySportsLoading}
              onClick={this.fetchSkySportsPlayers}
            >Fetch players from SkySport</button>
          </p>
          <p>
            <button
              onClick={this.fetchSpreadsheetPlayers}
              disabled={spreadsheetLoading}
            >
              Fetch players from Google-SpreadSheets
            </button>
          </p>

          <h3>Data Differences</h3>

          <PlayersFilters
            players={mergedPlayersArray}
            positions={positions}
            customFilter={{ fn: mismatch, label: 'Show only mis-matches' }}
          >
            {(playersFiltered) => (
              <PlayersTable
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

PlayersPage.propTypes = {
  fetchPlayers: PropTypes.func,
  fetchSkySportsPlayers: PropTypes.func,
  skySportsLoading: PropTypes.bool,
  skySportsPlayers: PropTypes.object,
  spreadsheetLoading: PropTypes.bool,
  fetchSpreadsheetPlayers: PropTypes.func,
  spreadsheetPlayers: PropTypes.object,
};

PlayersPage.defaultProps = {
  fetchPlayers: () => {},
  fetchSkySportsPlayers: () => {},
  skySportsLoading: false,
  skySportsPlayers: {},
  spreadsheetLoading: false,
  spreadsheetPlayers: {},
  fetchSpreadsheetPlayers: () => {},
};

export default PlayersPage;
