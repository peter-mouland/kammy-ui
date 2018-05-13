import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Select from '@kammy-ui/select';
import bemHelper from '@kammy-ui/bem';
import PlayerStats from '@kammy-ui/data-player-stats';
// import PlayersTable from '@kammy-ui/players-table/src/PlayersTable';
// const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];

const bem = bemHelper({ block: 'teams-table' });

class TeamsPage extends React.Component {
  state = {
    displayGw: '1',
    seasonStats: null,
    gameWeekStats: null,
  }

  updateDisplayGw = (displayGw) => {
    this.setState({ displayGw });
  }

  render() {
    const { teams, gameWeeks, gwTeams } = this.props;
    const { displayGw } = this.state;

    return (
      <div className={bem(null, null, 'page-content')}>
        <h3>Teams</h3>
        <div>
          <p>
            GW:
            <Select
              options={gameWeeks.map((gw) => gw.gameWeek)}
              defaultValue={displayGw}
              onChange={this.updateDisplayGw}
            />
            <span>{gameWeeks[displayGw - 1].start} to {gameWeeks[displayGw - 1].end}</span>
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
              {Object.keys(teams).map((manager) => (
                <Fragment key={manager}>
                  <tr>
                    <th colSpan="5">{manager}</th>
                  </tr>
                  {gwTeams[manager]
                    .map((gws) => {
                      const { player } = gws[parseInt(displayGw, 10)];
                      const positionFixtures = gws
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
                                    gameWeeks={[gameWeeks[displayGw - 1]]}
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
                                      start: gameWeeks[0].start,
                                      end: gameWeeks[gameWeeks.length - 1].end,
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
  gameWeeks: PropTypes.array,
  teams: PropTypes.object,
  gwTeams: PropTypes.object,
};

TeamsPage.defaultProps = {
  gameWeeks: [],
  teams: {},
  gwTeams: {},
};

export default TeamsPage;
