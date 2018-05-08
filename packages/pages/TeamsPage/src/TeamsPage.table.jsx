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
    if (!player || !player.name) {
      console.error('no Player: ', player);
      return [];
    }
    const { spreadsheetTransfers, spreadsheetGameWeeks, spreadsheetPlayers } = this.props;
    const transfers = spreadsheetTransfers[manager] || [];
    const endOfSeason = spreadsheetGameWeeks[spreadsheetGameWeeks.length - 1].end;
    const skyPlayer = this.findSkyPlayer(player);
    const playerTransfers = [{
      player: skyPlayer,
      start: new Date(spreadsheetGameWeeks[0].start).setHours(0, 0, 0, 0),
    }];

    transfers
      .filter((transfer) => (
        transfer.type === 'Transfer'
          && spreadsheetPlayers[transfer.transferIn]
          && spreadsheetPlayers[transfer.transferOut]
      ))
      .forEach((transfer) => {
        const lastTransfer = playerTransfers[playerTransfers.length - 1];
        const playerIn = spreadsheetPlayers[transfer.transferIn];
        if (transfer.transferOut === lastTransfer.player.name) {
          playerTransfers[playerTransfers.length - 1].end = new Date(transfer.timestamp);
          playerTransfers[playerTransfers.length - 1].endTS = transfer.timestamp;
          const skyPlayerIn = this.findSkyPlayer(playerIn);
          playerTransfers.push({
            player: skyPlayerIn,
            start: new Date(transfer.timestamp),
            startTS: transfer.timestamp,
          });
        }
      });

    playerTransfers[playerTransfers.length - 1].end = new Date(endOfSeason).setHours(23, 59, 59, 999);
    return playerTransfers;
  }

  findPlayerThisGw = (transferList, { start }) => {
    const gwPlayerStart = transferList.filter((transfer) => transfer.start < new Date(start));
    const gwPlayer = gwPlayerStart[gwPlayerStart.length - 1];
    return gwPlayer;
  }

  findSkyPlayer = (player) => {
    const { skySportsPlayers, spreadsheetPlayers } = this.props;
    const spreadsheetPlayer = spreadsheetPlayers[player.name];
    if (!player || !player.name || !spreadsheetPlayer) {
      console.error('no Player: ', player);
      return {};
    }
    return {
      ...skySportsPlayers[player.name],
      pos: spreadsheetPlayers[player.name].pos,
    };
  }

  /* OUTPUT of TEAM
    olly: [
      [ // GK
        [ // GWs Fixtures {}
          { status, date, stats: [], },
        ],
      ],
      [], // CB
    ]
  */
  findGameWeekTeam = (teamManager) => {
    const {
      spreadsheetTeams,
      spreadsheetGameWeeks,
    } = this.props;

    const originalTeam = spreadsheetTeams[teamManager];
    const team = originalTeam.map((teamPlayer) => {
      const playerTransfers = this.findTransfer(teamManager, teamPlayer);
      return spreadsheetGameWeeks.map((gw) => {
        const playerThisGw = this.findPlayerThisGw(playerTransfers, gw);
        const fixtures = getGwFixtures(playerThisGw, gw);
        return { ...playerThisGw, fixtures };
      });
    });
    return team;
  }

  render() {
    const { spreadsheetTeams, spreadsheetGameWeeks } = this.props;
    const { displayGw } = this.state;

    const gwTeams = {};
    Object.keys(spreadsheetTeams).forEach((manager) => {
      gwTeams[manager] = this.findGameWeekTeam(manager);
    });

    return (
      <div className={bem(null, null, 'page-content')}>
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
                  {gwTeams[manager]
                    .map((gameWeeks) => {
                      const gameWeek = gameWeeks[parseInt(displayGw, 10)];
                      const { player } = gameWeek;
                      if (!player || !player.fixtures) {
                        console.error('No Player, ', gameWeek);
                        return null;
                      }
                      const positionFixtures = gameWeeks
                        .filter((gw, i) => gw.player.fixtures[i])
                        .map((gw, i) => gw.player.fixtures[i]);
                      const positionData = {
                        ...player,
                        fixtures: positionFixtures,
                      };

                      return (
                        <tr key={player.code || player.name}>
                          <td>{player.name}</td>
                          <td>{player.code}</td>
                          <td>{player.pos || '?'}</td>
                          {
                            player.fixtures && (
                              <Fragment>
                                <td>
                                  <PlayerStats
                                    gameWeeks={[spreadsheetGameWeeks[displayGw - 1]]}
                                    data={player}
                                  >
                                    {
                                      (data) => (data.points ? JSON.stringify(data.points) : null)
                                    }
                                  </PlayerStats>
                                </td>
                                <td>
                                  {
                                    /* TODO: build player with correct fixtures based on GW/position */
                                  }
                                  <PlayerStats
                                    gameWeeks={[{
                                      start: spreadsheetGameWeeks[0].start,
                                      end: spreadsheetGameWeeks[spreadsheetGameWeeks.length - 1].end,
                                    }]}
                                    data={ positionData }
                                  >
                                    {
                                      (data) => (data.points ? JSON.stringify(data.points) : null)
                                    }
                                  </PlayerStats>
                                </td>
                              </Fragment>
                            )
                          }
                        </tr>
                      );
                    })}
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
