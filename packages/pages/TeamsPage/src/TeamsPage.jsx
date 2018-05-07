import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import Select from '@kammy-ui/select';
import bemHelper from '@kammy-ui/bem';
import PlayerStats from '@kammy-ui/data-player-stats';

const bem = bemHelper({ block: 'teams-page' });

const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];

class TeamsPage extends React.Component {
  state = {
    displayGw: 1,
  }

  componentDidMount() {
    this.props.fetchSkySportsPlayersFull();
    this.props.fetchTeams();
    this.props.fetchTransfers();
    this.props.fetchGameWeeks();
    this.props.fetchSpreadsheetPlayers();
  }

  updateDisplayGw = (displayGw) => {
    this.setState({ displayGw });
  }

  render() {
    const {
      spreadsheetTeamsLoading, spreadsheetTeams, spreadsheetTeamsCount, spreadsheetTeamsLoaded,
      spreadsheetPlayersLoading, spreadsheetPlayers, spreadsheetPlayersCount, spreadsheetPlayersLoaded,
      spreadsheetGameWeeksLoading, spreadsheetGameWeeks, spreadsheetGameWeeksCount, spreadsheetGameWeeksLoaded,
      spreadsheetTransfersLoading, spreadsheetTransfers, spreadsheetTransfersCount, spreadsheetTransfersLoaded,
      skySportsLoading, skySportsPlayers, skySportsPlayersCount, skySportsLoaded,
    } = this.props;

    const { displayGw } = this.state;

    const loading = (skySportsLoading || spreadsheetGameWeeksLoading || spreadsheetTransfersLoading || spreadsheetTeamsLoading || spreadsheetPlayersLoading);
    const loaded = (skySportsLoaded && spreadsheetGameWeeksLoaded && spreadsheetTransfersLoaded && spreadsheetTeamsLoaded && spreadsheetPlayersLoaded);
    console.log(skySportsPlayers);
    console.log(spreadsheetTransfers);
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
              Sky Sports Stats :
              {skySportsLoading ? <Interstitial /> : skySportsPlayersCount}
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
            <div className="page-content">
              <h3>Teams</h3>
              <div>
                <p>
                  GW:
                  <Select
                    options={spreadsheetGameWeeks.map((gw) => gw.gameWeek)}
                    defaultValue={displayGw}
                    onChange={this.updateDisplayGw}
                  />
                  <span>{spreadsheetGameWeeks[displayGw - 1].start} to {spreadsheetGameWeeks[displayGw - 1].end}</span>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Code</th>
                      <th>Position</th>
                      <th>GW Score<sup>*</sup></th>
                      <th>Season Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(spreadsheetTeams).map((manager) => (
                      <Fragment key={manager}>
                        <tr>
                          <th colSpan="5">{manager}</th>
                        </tr>
                        {spreadsheetTeams[manager].map((teamPlayer) => (
                          <tr key={teamPlayer.code || teamPlayer.player}>
                            <td>{teamPlayer.player}</td>
                            <td>{teamPlayer.code}</td>
                            <td>{
                              teamPlayer.code && spreadsheetPlayers[teamPlayer.player]
                                ? spreadsheetPlayers[teamPlayer.player].pos
                                : '?'
                            }</td>
                            <td>
                              <PlayerStats
                                gameWeeks={[spreadsheetGameWeeks[displayGw - 1]]}
                                data={skySportsPlayers.find((player) => String(player.id) === String(teamPlayer.code))}
                              >{
                                  (data) => (data.points ? JSON.stringify(data.points) : null)
                                }
                              </PlayerStats>
                            </td>
                            <td>
                              <PlayerStats
                                gameWeeks={[{
                                  start: spreadsheetGameWeeks[0].start,
                                  end: spreadsheetGameWeeks[spreadsheetGameWeeks.length - 1].end,
                                }]}
                                data={skySportsPlayers.find((player) => String(player.id) === String(teamPlayer.code))}
                              >{
                                  (data) => (data.points ? JSON.stringify(data.points) : null)
                                }
                              </PlayerStats>
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      </section>
    );
  }
}

TeamsPage.propTypes = {
  fetchSkySportsPlayersFull: PropTypes.func,
  skySportsLoading: PropTypes.bool,
  skySportsLoaded: PropTypes.bool,
  skySportsPlayers: PropTypes.object,
  skySportsPlayersCount: PropTypes.number,

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
  fetchSkySportsPlayersFull: () => {},
  fetchTransfers: () => {},
  fetchGameWeeks: () => {},
  fetchSpreadsheetPlayers: () => {},
  skySportsLoading: false,
  skySportsLoaded: false,
  skySportsPlayers: {},
  skySportsPlayersCount: null,
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
