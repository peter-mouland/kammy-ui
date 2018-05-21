import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
import Modal from '@kammy-ui/modal';

import FormattedGameWeekDate from './components/FormattedGameWeekDate';
import PlayerTimeline from './components/PlayerTimeline.table';
import PositionTimeline from './components/PositionTimeline.table';
import { keysAsCellHeaders, pairedKeysAsCells } from './lib/tableHelpers';
import formatSeasonUntilGw from './lib/formatSeasonUntilGw';
import './teamsPage.scss';

const bem = bemHelper({ block: 'teams-table' });

class TeamsPage extends React.Component {
  state = {
    displayGw: '40',
    displayManager: 'Nick',
    seasonStats: null,
    gameWeekStats: null,
    showPositionTimeline: false,
    showPlayerTimeline: false,
    positionTimelineProps: {},
    playerTimelineProps: {},
  }

  showTimeline = (e, {
    position, gameWeeks, season, total,
  }) => {
    e.preventDefault();
    this.setState({
      showPositionTimeline: true,
      positionTimelineProps: {
        total,
        gameWeeks,
        season,
        position,
      },
    });
  }

  showPlayerTimeline = (e, {
    player, season, total,
  }) => {
    e.preventDefault();
    this.setState({
      showPlayerTimeline: true,
      playerTimelineProps: {
        player,
        season,
        total,
      },
    });
  }

  closeModal = () => {
    this.setState({ showPositionTimeline: false, showPlayerTimeline: false });
  }

  updateDisplayGw = (displayGw) => {
    this.setState({ displayGw });
  }

  updateDisplayManager = (displayManager) => {
    this.setState({ displayManager });
  }

  render() {
    const { teams, gameWeeks, gwTeams } = this.props;
    const {
      displayGw, displayManager,
      showPositionTimeline, positionTimelineProps,
      showPlayerTimeline, playerTimelineProps,
    } = this.state;
    const intGameWeek = parseInt(displayGw, 10) - 1;
    const previousGameWeek = intGameWeek - 1 > -1 ? intGameWeek - 1 : 0;

    return (
      <div className={bem(null, null, 'page-content')}>
        <h3>Teams</h3>
        {showPositionTimeline && (
          <Modal
            key={'timeline'}
            id={'timeline'}
            wide
            title={`${positionTimelineProps.position} Time-line`}
            open={showPositionTimeline}
            onClose={this.closeModal}
          >
            <PositionTimeline { ...positionTimelineProps } />
          </Modal>
        )}
        {showPlayerTimeline && (
          <Modal
            key={'player-timeline'}
            id={'player-timeline'}
            wide
            title={`${playerTimelineProps.player.name} Time-line`}
            open={showPlayerTimeline}
            onClose={this.closeModal}
          >
            <PlayerTimeline { ...playerTimelineProps } />
          </Modal>
        )}
        <MultiToggle
          label={'Manager'}
          id={'manager'}
          options={Object.keys(teams)}
          checked={displayManager}
          onChange={this.updateDisplayManager}
        />
        <MultiToggle
          label={'GameWeek'}
          id={'GameWeek'}
          checked={displayGw}
          options={gameWeeks.map((gw) => gw.gameWeek)}
          onChange={this.updateDisplayGw}
          contextualHelp={(value) => <FormattedGameWeekDate gameWeek={gameWeeks[value - 1]}/>}
        />
        <FormattedGameWeekDate gameWeek={gameWeeks[intGameWeek]}/>
        <table>
          {Object.keys(teams)
            .filter((manager) => (manager === displayManager || displayManager === 'all'))
            .map((manager) => (
              <Fragment key={manager}>
                <thead>
                  <tr>
                    <th colSpan="4">{manager}</th>
                    <th colSpan={24}>Season</th>
                  </tr>
                  <tr>
                    <th>Team Position</th>
                    <th>Player</th>
                    <th>Position</th>
                    <th>Club</th>
                    {keysAsCellHeaders(gwTeams[manager][0].seasonStats, { colSpan: 2 })}
                  </tr>
                </thead>
                <tbody>
                  {gwTeams[manager].map((teamSheetItem) => {
                    const player = teamSheetItem.gameWeeks[intGameWeek];
                    const playerLastGW = teamSheetItem.gameWeeks[previousGameWeek];
                    const seasonToDate = formatSeasonUntilGw(teamSheetItem, intGameWeek + 1);
                    return (
                      <tr
                        key={player.name}
                        className={
                          playerLastGW.name !== player.name
                            ? bem('transfer')
                            : null
                        }
                      >
                        <th>
                          <a
                            href={'#'}
                            onClick={(e) => this.showTimeline(e, {
                              position: player.pos,
                              gameWeeks: teamSheetItem.gameWeeks,
                              season: teamSheetItem.seasonStats,
                              total: teamSheetItem.seasonPoints.total,
                            })}
                            title={`Show ${teamSheetItem.teamPos} timeline`}
                          >
                            {teamSheetItem.teamPos}
                          </a>
                        </th>
                        <td>
                          <a
                            href={'#'}
                            onClick={(e) => this.showPlayerTimeline(e, { player })}
                            title={`Show ${teamSheetItem.teamPos} timeline`}
                          >
                            {player.name}
                          </a></td>
                        <td>{player.pos}</td>
                        <td>{player.club}</td>
                        {
                          player && (
                            pairedKeysAsCells(
                              {
                                ...seasonToDate.seasonStats,
                                points: seasonToDate.seasonPoints.total,
                              },
                              {
                                ...player.gameWeekStats,
                                points: player.points.total,
                              },
                            )
                          )
                        }
                      </tr>
                    );
                  })}
                </tbody>
              </Fragment>
            ))}
        </table>
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
