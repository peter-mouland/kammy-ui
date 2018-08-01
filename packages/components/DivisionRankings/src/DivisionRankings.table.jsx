import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import FormattedGameWeekDate from './components/FormattedGameWeekDate';
import positions from './lib/positions';
import getTeamPoints from './lib/calculate-division-rank';

import './divisions-rankings.scss';

const bem = bemHelper({ block: 'teams-table' });

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
