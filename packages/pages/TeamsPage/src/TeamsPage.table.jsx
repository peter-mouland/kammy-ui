import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import jsonQuery from 'json-query';

import Select from '@kammy-ui/select';
import bemHelper from '@kammy-ui/bem';
import PlayerStats from '@kammy-ui/data-player-stats';

const bem = bemHelper({ block: 'teams-table' });

const getGwFixtures = (data, { start, end }) => (
  jsonQuery('fixtures[*:date]', {
    data,
    locals: {
      date(item) {
        const fixtureDate = new Date(item.date);
        // todo: test this start and end dates with hours!
        const endDate = new Date(end).setHours(23, 59, 59, 999);
        const startDate = new Date(start).setHours(0, 0, 0, 0);
        return fixtureDate <= endDate && fixtureDate >= startDate;
      },
    },
  })
);

class TeamsPage extends React.Component {
  state = {
    displayGw: '1',
  }

  updateDisplayGw = (displayGw) => {
    this.setState({ displayGw });
  }


  /* OUTPUT:
    [
      { player, start, end }
    ]
  */
  findTransfer = (manager, player) => {
    const { spreadsheetTransfers, spreadsheetGameWeeks, spreadsheetPlayers } = this.props;
    const transfers = spreadsheetTransfers[manager];
    const endOfSeason = spreadsheetGameWeeks[spreadsheetGameWeeks.length - 1].end;

    const playerTransfers = [{
      player,
      start: spreadsheetGameWeeks[0].start,
    }];

    transfers
      .filter((transfer) => (
        transfer.type === 'Transfer'
          && spreadsheetPlayers[transfer.transferIn]
          && spreadsheetPlayers[transfer.transferOut]
      ))
      .forEach((transfer) => {
        const lastTransfer = playerTransfers[playerTransfers.length - 1];
        if (transfer.transferOut === lastTransfer.player.name) {
          playerTransfers[playerTransfers.length - 1].end = transfer.timestamp;
          playerTransfers.push({
            player: this.findSkyPlayer(spreadsheetPlayers[transfer.transferIn]),
            start: transfer.timestamp,
          });
        }
      });

    playerTransfers[playerTransfers.length - 1].end = endOfSeason;
    console.log({ playerTransfers })

    return playerTransfers;
  }

  findSkyPlayer = (playerToFind) => (
    this.props.skySportsPlayers[playerToFind.name.trim()]
  )

  render() {
    const {
      spreadsheetTeams,
      spreadsheetPlayers,
      spreadsheetGameWeeks,
      spreadsheetTransfers,
      skySportsPlayers,
    } = this.props;

    const { displayGw } = this.state;

    window.spreadsheetTeams = spreadsheetTeams
    window.skySportsPlayers = skySportsPlayers
    window.spreadsheetTransfers = spreadsheetTransfers
    window.spreadsheetGameWeeks = spreadsheetGameWeeks
    console.log(spreadsheetTeams);
    console.log(skySportsPlayers);
    console.log(spreadsheetTransfers);
    console.log(spreadsheetGameWeeks);

    const teamManager = 'Olly';
    const originalTeam = spreadsheetTeams[teamManager];

    const team = originalTeam.map((teamPlayer) => {
      const playerTransfers = this.findTransfer(teamManager, teamPlayer);
      return spreadsheetGameWeeks.map((gw) => {
        const skySportsPlayer = this.findSkyPlayer(teamPlayer);
        const start = gw.start;
        const end = gw.end;
        const fixtures = getGwFixtures(skySportsPlayer, { start, end });
        return { ...teamPlayer, fixtures };
      });

    });

    const ollyGwTeam = {
      [teamManager]: team,
    };

    /* DESIRED OUTPUT of TEAM
      olly: [
        [ // GK
          [ // GWs Fixtures {}
            { status, date, stats: [], }
          ],
        ],
        [], // CB
        [], // CB
        [], // FB
        [], // FB
        [], // MID
        [], // MID
        [], // AM
        [], // AM
        [], // FWD
        [], // FWD
        [], // SUB
      ]
    */


    console.log(ollyGwTeam);

    debugger;

    return (
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
                    <tr key={teamPlayer.code || teamPlayer.name}>
                      <td>{teamPlayer.name}</td>
                      <td>{teamPlayer.code}</td>
                      <td>{
                        teamPlayer.code && spreadsheetPlayers[teamPlayer.name]
                          ? spreadsheetPlayers[teamPlayer.name].pos
                          : '?'
                      }</td>
                      <td>
                        <PlayerStats
                          gameWeeks={[spreadsheetGameWeeks[displayGw - 1]]}
                          data={this.findSkyPlayer(teamPlayer)}
                        >{
                            (data) => (data.points ? JSON.stringify(data.points) : null)
                          }
                        </PlayerStats>
                      </td>
                      <td>
                        {/* <PlayerStats */}
                        {/* gameWeeks={[{ */}
                        {/* start: spreadsheetGameWeeks[0].start, */}
                        {/* end: spreadsheetGameWeeks[spreadsheetGameWeeks.length - 1].end, */}
                        {/* }]} */}
                        {/* data={ MUST BUILD CORRECT DATA LIST FROM TEAM/TRANSFERS } */}
                        {/* >{ */}
                        {/* (data) => (data.points ? JSON.stringify(data.points) : null) */}
                        {/* } */}
                        {/* </PlayerStats> */}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

TeamsPage.propTypes = {
  skySportsPlayers: PropTypes.array,
  spreadsheetPlayers: PropTypes.object,
  spreadsheetGameWeeks: PropTypes.array,
  spreadsheetTransfers: PropTypes.object,
  spreadsheetTeams: PropTypes.object,
};

TeamsPage.defaultProps = {
  skySportsPlayers: {},
  spreadsheetPlayers: {},
  spreadsheetGameWeeks: [],
  spreadsheetTransfers: {},
  spreadsheetTeams: {},
};

export default TeamsPage;
