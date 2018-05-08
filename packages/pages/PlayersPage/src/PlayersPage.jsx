import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';

import PlayersPageTable from './PlayersPage.table';

const bem = bemHelper({ block: 'players-page' });

class PlayersPage extends React.Component {
  componentDidMount() {
    this.props.fetchDbPlayers();
    this.props.fetchSkySportsPlayers();
    this.props.fetchSpreadsheetPlayers();
  }

  copySkySportToDB = () => {
    this.props.importPlayers();
  };

  render() {
    const {
      dbLoading, dbPlayersCount, loaded, mergedPlayers,
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
          <PlayersPageTable players={mergedPlayers} />
        </div>
      </section>
    );
  }
}

PlayersPage.propTypes = {
  importPlayers: PropTypes.func.isRequired,
  mergedPlayers: PropTypes.object,
  loaded: PropTypes.bool,

  fetchSkySportsPlayers: PropTypes.func,
  skySportsLoading: PropTypes.bool,
  skySportsPlayers: PropTypes.object,
  skySportsPlayersCount: PropTypes.number,

  fetchDbPlayers: PropTypes.func,
  dbLoading: PropTypes.bool,
  dbPlayers: PropTypes.array,
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
  dbLoading: false,
  dbPlayers: [],
  dbPlayersCount: null,
  skySportsLoading: false,
  skySportsPlayers: {},
  skySportsPlayersCount: null,
  spreadsheetLoading: false,
  spreadsheetPlayers: {},
  spreadsheetPlayersCount: null,
};

export default PlayersPage;
