import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
import Modal from '@kammy-ui/modal';

import FormattedGameWeekDate from './components/FormattedGameWeekDate';
import PositionTimeline from './components/PositionTimeline.table';
import { keysAsCellHeaders, pairedKeysAsCells } from './lib/tableHelpers';
import './teamsPage.scss';

const bem = bemHelper({ block: 'teams-table' });


class TeamsPage extends React.Component {
  state = {
    displayGw: '40',
    displayManager: 'Nick',
    seasonStats: null,
    gameWeekStats: null,
    showPositionTimeline: false,
    positionTimelineProps: {},
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

  closeModal = () => {
    this.setState({ showPositionTimeline: false });
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
      displayGw, displayManager, showPositionTimeline, positionTimelineProps,
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
                    <th colSpan={24}>Season: // todo: <em>to date</em> i.e. update with selected gw</th>
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
                  {gwTeams[manager].map((teamSheetItem) => (
                    <tr
                      key={teamSheetItem.gameWeeks[intGameWeek].name}
                      className={
                        teamSheetItem.gameWeeks[previousGameWeek].name !== teamSheetItem.gameWeeks[intGameWeek].name
                          ? bem('transfer')
                          : null
                      }
                    >
                      <th>
                        <a
                          href={'#'}
                          onClick={(e) => this.showTimeline(e, {
                            position: teamSheetItem.gameWeeks[intGameWeek].pos,
                            gameWeeks: teamSheetItem.gameWeeks,
                            season: teamSheetItem.seasonStats,
                            total: teamSheetItem.seasonPoints.total,
                          })}
                          title={`Show ${teamSheetItem.teamPos} timeline`}
                        >
                          {teamSheetItem.teamPos}
                        </a>
                      </th>
                      <td>{teamSheetItem.gameWeeks[intGameWeek].name}</td>
                      <td>{teamSheetItem.gameWeeks[intGameWeek].pos}</td>
                      <td>{teamSheetItem.gameWeeks[intGameWeek].club}</td>
                      {
                        teamSheetItem.gameWeeks[intGameWeek] && (
                          pairedKeysAsCells(
                            {
                              ...teamSheetItem.seasonStats,
                              points: teamSheetItem.seasonPoints.total,
                            },
                            {
                              ...teamSheetItem.gameWeeks[intGameWeek].gameWeekStats,
                              points: teamSheetItem.gameWeeks[intGameWeek].points.total,
                            },
                          )
                        )
                      }
                    </tr>
                  ))}
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
