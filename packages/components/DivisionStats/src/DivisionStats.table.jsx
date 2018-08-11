import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
import Modal from '@kammy-ui/modal';

import FormattedGameWeekDate from './components/FormattedGameWeekDate';
import PlayerTimeline from './components/PlayerTimeline.table';
import PositionTimeline from './components/PositionTimeline.table';
import { keysAsCellHeaders, pairedKeysAsCells } from './components/tableHelpers';
import './divisionStats.scss';

const bem = bemHelper({ block: 'table' });

// team = managersSeason[manager]
const validateClub = (team, intGameWeek) => {
  const players = team.map((teamSheetItem) => teamSheetItem.gameWeeks[intGameWeek]);
  return players.reduce((acc, player) => {
    const count = (acc[player.club] || 0) + 1;
    const warnings = count > 2 && acc.warnings.indexOf(player.club) < 0
      ? [...acc.warnings, player.club]
      : acc.warnings;
    return ({
      ...acc,
      [player.club]: count,
      warnings,
    });
  }, { warnings: [] });
};

class TeamsPage extends React.Component {
  state = {
    displayGw: '1',
    seasonStats: null,
    gameWeekStats: null,
    showPositionTimeline: false,
    showPlayerTimeline: false,
    positionTimelineProps: {},
    playerTimelineProps: {},
  }

  constructor(props) {
    super(props);
    const currentGameWeek = props.gameWeeks.filter((gw) => (
      new Date() < new Date(gw.end) && new Date() > new Date(gw.start)
    )).length;
    this.state.displayGw = String(currentGameWeek);
  }

  showPositionTimeline = (e, {
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

  showPlayerTimeline = (e, { player }) => {
    e.preventDefault();
    this.setState({
      showPlayerTimeline: true,
      playerTimelineProps: { player },
    });
  }

  closeModal = () => {
    this.setState({ showPositionTimeline: false, showPlayerTimeline: false });
  }

  updateDisplayGw = (displayGw) => {
    this.setState({ displayGw });
  }

  render() {
    const { teams, gameWeeks, managersSeason } = this.props;
    const {
      displayGw,
      showPositionTimeline, positionTimelineProps,
      showPlayerTimeline, playerTimelineProps,
    } = this.state;
    const intGameWeek = parseInt(displayGw, 10) - 1 < 0 ? 0 : parseInt(displayGw, 10) - 1;
    const previousGameWeek = intGameWeek - 1 > -1 ? intGameWeek - 1 : 0;

    return (
      <div className={bem(null, null, 'page-content')}>
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
          label={'GameWeek'}
          id={'GameWeek'}
          checked={displayGw}
          options={gameWeeks.map((gw) => gw.gameWeek)}
          onChange={this.updateDisplayGw}
          contextualHelp={(value) => <FormattedGameWeekDate gameWeek={gameWeeks[value - 1]}/>}
        />
        <FormattedGameWeekDate gameWeek={gameWeeks[intGameWeek]}/>
        {Object
          .keys(teams)
          .sort()
          .map((manager) => {
            const { warnings } = validateClub(managersSeason[manager], intGameWeek);
            return (
              <table key={manager}>
                <thead>
                  <tr>
                    <th colSpan="4" className={'cell cell--team-manager'}>{manager}</th>
                    <th colSpan={24} className={'cell cell--team-season'}>Season</th>
                  </tr>
                  <tr className={'row row--header'}>
                    <th className={'cell cell--team-position'}>Team Position</th>
                    <th className={'cell cell--player'}>Player</th>
                    <th className={'cell cell--position'}>Position</th>
                    <th className={'cell cell--club'}>Club</th>
                    {keysAsCellHeaders(managersSeason[manager][0].seasonStats, { colSpan: 2 })}
                  </tr>
                </thead>
                <tbody>
                  {managersSeason[manager].map((teamSheetItem) => {
                    const player = teamSheetItem.gameWeeks[intGameWeek];
                    const seasonToGameWeek = teamSheetItem.seasonToGameWeek[intGameWeek];
                    const playerLastGW = teamSheetItem.gameWeeks[previousGameWeek];
                    const className = playerLastGW.name !== player.name ? bem('transfer') : '';
                    const warningClassName = warnings.indexOf(player.club) > -1 ? 'row row--warning' : 'row';
                    return (
                      <tr
                        key={player.name}
                        className={`${className} ${warningClassName}`}
                      >
                        <td className={'cell cell--team-position'}>
                          <a
                            href={'#'}
                            onClick={(e) => this.showPositionTimeline(e, {
                              position: player.pos,
                              gameWeeks: teamSheetItem.gameWeeks,
                              season: teamSheetItem.seasonStats,
                            })}
                            title={`Show ${teamSheetItem.teamPos} timeline`}
                          >
                            {teamSheetItem.teamPos}
                          </a>
                        </td>
                        <td className={'cell cell--player'}>
                          <a
                            href={'#'}
                            onClick={(e) => this.showPlayerTimeline(e, { player })}
                            title={`Show ${teamSheetItem.teamPos} timeline`}
                          >
                            {player.name}
                          </a></td>
                        <td className={'cell cell--position'}>{player.pos}</td>
                        <td className={'cell cell--club'}>{player.club}</td>
                        {
                          player && (
                            pairedKeysAsCells(
                              seasonToGameWeek,
                              player.gameWeekStats,
                            )
                          )
                        }
                      </tr>
                    );
                  })}
                </tbody>
                {warnings.length > 0 && (
                  <tfoot>
                    <tr className={'row row--warning'}>
                      <td colSpan={30}>
                        This team has more than 2 players within the following clubs: {warnings.join(', ')}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            );
          })}
      </div>
    );
  }
}

TeamsPage.propTypes = {
  gameWeeks: PropTypes.array,
  teams: PropTypes.object,
  managersSeason: PropTypes.object,
};

TeamsPage.defaultProps = {
  gameWeeks: [],
  teams: {},
  managersSeason: {},
};

export default TeamsPage;
