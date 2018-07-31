import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import FormattedGameWeekDate from './components/FormattedGameWeekDate';

import './divisions-rankings.scss';

const bem = bemHelper({ block: 'teams-table' });
const positions = [
  { label: 'GK / SUB', teamPos: ['GK', 'SUB'] },
  { label: 'CB', teamPos: ['CB'] },
  { label: 'FB', teamPos: ['FB'] },
  { label: 'AM', teamPos: ['AM'] },
  { label: 'MID', teamPos: ['MID'] },
  { label: 'STR', teamPos: ['STR', 'FWD'] },
];

const getPositionLabel = (teamPos) => (
  positions.find((position) => position.teamPos.includes(teamPos))
);

const getPositionPoints = (team, intGameWeek) => {
  const posPoints = team
    .reduce((prev, teamSheetItem) => {
      const player = teamSheetItem.gameWeeks[intGameWeek];
      const seasonToGameWeek = teamSheetItem.seasonToGameWeek[intGameWeek];
      const key = getPositionLabel(teamSheetItem.teamPos).label;
      const gameWeekPoints = player.gameWeekStats.points;
      const gameWeek = prev[key] ? prev[key].gameWeek + gameWeekPoints : gameWeekPoints;
      const season = prev[key] ? prev[key].season + seasonToGameWeek.points : seasonToGameWeek.points;
      return {
        ...prev,
        [key]: {
          gameWeek, season, rank: -1,
        },
      };
    }, {});
  return {
    ...posPoints,
    total: {
      gameWeek: -1, season: -1, rank: -1,
    },
  };
};

const getTeamPoints = (teams, managersSeason, intGameWeek) => (
  Object.keys(teams).map((manager) => ({
    manager,
    positionPoints: getPositionPoints(managersSeason[manager], intGameWeek),
  }))
);

class TeamsPage extends React.Component {
  state = {
    displayGw: '1',
    seasonStats: null,
    gameWeekStats: null,
  }

  constructor(props) {
    super(props);
    const currentGameWeek = props.gameWeeks.filter((gw) => (
      new Date() < new Date(gw.end) && new Date() > new Date(gw.start)
    )).length;
    this.state.displayGw = String(currentGameWeek + 1);
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
    } = this.state;
    const intGameWeek = parseInt(displayGw, 10) - 1;

    return (
      <div className={bem(null, null, 'page-content')}>
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
          <thead>
            <tr>
              <th className={'cell cell--team-manager'}>Manager</th>
              {
                positions.map((position) => (
                  <th
                    key={position.label}
                    colSpan={2}
                    className={'cell cell--team-season'}
                  >
                    {position.label}
                  </th>
                ))
              }
              <th
                colSpan={2}
                className={'cell cell--team-season'}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {getTeamPoints(teams, managersSeason, intGameWeek)
              .map(({ manager, positionPoints }) => (
                <tr key={manager}>
                  <td>{manager}</td>
                  {positions.map((position) => (
                    <Fragment key={position.label}>
                      <td>{ positionPoints[position.label].rank }</td>
                      <td>{ positionPoints[position.label].gameWeek }</td>
                    </Fragment>
                  ))}
                  <td>{ positionPoints.total.rank }</td>
                  <td>{ positionPoints.total.gameWeek }</td>
                </tr>
              ))}
          </tbody>
        </table>
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
