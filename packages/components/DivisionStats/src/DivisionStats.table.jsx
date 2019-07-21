import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import Modal from '@kammy-ui/modal';

import PlayerTimeline from './components/PlayerTimeline.table';
import PositionTimeline from './components/PositionTimeline.table';
import { keysAsCellHeaders, pairedKeysAsCells } from './components/tableHelpers';

const bem = bemHelper({ block: 'table' });

const validatePlayer = (managersSeason, intGameWeek) => {
  const players = Object.keys(managersSeason).reduce((acc, manager) => ([
    ...acc,
    ...managersSeason[manager].map((teamSheetItem) => teamSheetItem.gameWeeks[intGameWeek]),
  ]), []);
  const cache = {};
  return players
    .reduce((acc, player = {}) => {
      const dupe = [...acc];
      if (cache[player.name] && !dupe.includes(player.name)) {
        dupe.push(player.name);
      }
      cache[player.name] = true;
      return dupe;
    }, [])
    .filter(Boolean)
    .filter(({ club }) => !!club);
};

const validateClub = (team = [], intGameWeek) => {
  const players = team
    .map((teamSheetItem) => teamSheetItem.gameWeeks[intGameWeek])
    .filter(Boolean)
    .filter(({ club }) => !!club);
  return players.reduce((acc, player = {}) => {
    const count = (acc[player.club] || 0) + 1;
    const clubWarnings = count > 2 && acc.clubWarnings.indexOf(player.club) < 0
      ? [...acc.clubWarnings, player.club]
      : acc.clubWarnings;
    return ({
      ...acc,
      [player.club]: count,
      clubWarnings,
    });
  }, { clubWarnings: [] });
};

class TeamsPage extends React.Component {
  state = {
    seasonStats: null,
    gameWeekStats: null,
    showPositionTimeline: false,
    showPlayerTimeline: false,
    positionTimelineProps: {},
    playerTimelineProps: {},
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

  render() {
    const {
      teams, managersSeason, selectedGameWeek, isAdmin, managers,
    } = this.props;
    const {
      showPositionTimeline, positionTimelineProps,
      showPlayerTimeline, playerTimelineProps,
    } = this.state;
    const previousGameWeek = selectedGameWeek > 0 ? selectedGameWeek : 0;
    const duplicatePlayers = validatePlayer(managersSeason, selectedGameWeek) || [];
    const allClubWarnings = Object.keys(teams).sort().map((manager) => {
      const { clubWarnings } = validateClub(managersSeason[manager], selectedGameWeek);
      return clubWarnings.length ? { clubWarnings, manager } : undefined;
    }).filter(Boolean);

    return (
      <div className={bem(null, null, 'page-content')} data-b-layout="row vpad">
        <div>
          {showPositionTimeline && (
            <Modal
              key={'timeline'}
              id={'timeline'}
              wide
              title={`${positionTimelineProps.position} Timeline`}
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
              title={`${playerTimelineProps.player.name} Timeline`}
              open={showPlayerTimeline}
              onClose={this.closeModal}
            >
              <PlayerTimeline { ...playerTimelineProps } />
            </Modal>
          )}
          {isAdmin && duplicatePlayers.length > 0 && (
            <div className={'row row--warning'}>
              This division has the following player(s) in more than 2 teams: {duplicatePlayers.join(', ')}
            </div>
          )}
          {isAdmin && allClubWarnings.length > 0 && (
            <div className={'row row--warning'}>
              This division has teams with 3+ players from the same club:
              {allClubWarnings.map(({ manager, clubWarnings }) => `${manager}: ${clubWarnings.join(', ')}`)}
            </div>
          )}
        </div>
        <div data-b-layout="vpad">
          <table className={'table'}>
            {managers.map((manager) => {
              const thisManager = managersSeason[manager] || [];
              const { clubWarnings } = validateClub(thisManager, selectedGameWeek);
              return (
                <Fragment key={manager}>
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
                      {keysAsCellHeaders((thisManager[0] || {}).seasonStats, { colSpan: 2 })}
                    </tr>
                  </thead>
                  <tbody>
                    {thisManager.map((teamSheetItem) => {
                      const player = teamSheetItem.gameWeeks[selectedGameWeek] || {};
                      const seasonToGameWeek = teamSheetItem.seasonToGameWeek[selectedGameWeek];
                      const playerLastGW = teamSheetItem.gameWeeks[previousGameWeek];
                      const className = playerLastGW.name !== player.name ? bem('transfer') : '';
                      const warningClassName = isAdmin && (
                        clubWarnings.indexOf(player.club) > -1 || duplicatePlayers.indexOf(player.name) > -1
                      ) ? 'row row--warning' : 'row';
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
                  {isAdmin && clubWarnings.length > 0 && (
                    <tr className={'row row--warning'}>
                      <td colSpan={30}>
                        This team has more than 2 players within the following clubs: {clubWarnings.join(', ')}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

TeamsPage.propTypes = {
  selectedGameWeek: PropTypes.number,
  teams: PropTypes.object,
  managersSeason: PropTypes.object,
  isAdmin: PropTypes.bool,
  managers: PropTypes.array,
};

TeamsPage.defaultProps = {
  isAdmin: false,
  selectedGameWeek: 1,
  teams: {},
  managersSeason: {},
  managers: [],
};

export default TeamsPage;
