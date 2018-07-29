import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Svg from '@kammy-ui/svg';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import changeIcon from './change.svg';
import './transferPage.scss';

const bem = bemHelper({ block: 'transfers-page' });

class TransfersPage extends React.Component {
  state = {
    displayManager: null,
    changeType: null,
    changePlayer: null,
  }

  updateDisplayManager = (displayManager) => {
    this.setState({ displayManager });
  }

  updateChangeType = (changeType) => {
    this.setState({ changeType });
  }

  updateChangePlayer = (changePlayer) => {
    this.setState({ changePlayer });
  }

  getStep = () => {
    const { displayManager, changeType, changePlayer } = this.state;
    switch (true) {
    case !!changePlayer: return 4;
    case !!changeType: return 3;
    case !!displayManager: return 2;
    default: return 1;
    }
  }

  getInvalidTeams = () => null;

  render() {
    const { teams, managersSeason } = this.props;
    const { displayManager, changeType, changePlayer } = this.state;

    const intGameWeek = 39;
    const step = this.getStep();
    const invalidTeams = this.getInvalidTeams();

    return (
      <div className={bem(null, null, 'page-content')}>
        <MultiToggle
          label={'Who are you?'}
          id={'manager'}
          options={Object.keys(teams)}
          checked={displayManager}
          onChange={this.updateDisplayManager}
        />
        {step > 1 && (
          <MultiToggle
            label={'What type of team-sheet change?'}
            id={'change-type'}
            options={['Loan', 'Swap', 'Trade', 'Transfer', 'Waiver']}
            checked={changeType}
            onChange={this.updateChangeType}
          />
        )}
        {step > 2 && (
          <Fragment>
            <h3>Who would you like to <em>{changeType}</em> out?</h3>
            <table>
              <tbody>
                {managersSeason[displayManager].map((teamSheetItem) => {
                  const player = teamSheetItem.gameWeeks[intGameWeek];
                  return (
                    <tr key={player.name}>
                      <td className={'cell cell--team-position'}>
                        {teamSheetItem.teamPos}
                      </td>
                      <td className={'cell cell--player'}>
                        {player.name}
                      </td>
                      <td className={'cell cell--position'}>{player.pos}</td>
                      <td className={'cell cell--club'}>{player.club}</td>
                      <td>
                        <Svg
                          className={'change-icon'}
                          onClick={() => this.updateChangePlayer(player)}
                        >
                          {changeIcon}
                        </Svg>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Fragment>
        )}
        {step > 3 && (
          <Fragment>
            <h3>Who to <em>{changeType}</em> in (to replace {changePlayer.name})</h3>
            <p>Notes: must be a {changePlayer.pos} and cannot be from ${invalidTeams}</p>
            <table>
              <tbody>
                {managersSeason[displayManager].map((teamSheetItem) => {
                  const player = teamSheetItem.gameWeeks[intGameWeek];
                  return (
                    <tr key={player.name}>
                      <td className={'cell cell--team-position'}>
                        {teamSheetItem.teamPos}
                      </td>
                      <td className={'cell cell--player'}>
                        {player.name}
                      </td>
                      <td className={'cell cell--position'}>{player.pos}</td>
                      <td className={'cell cell--club'}>{player.club}</td>
                      <td><Svg onClick={() => this.updateChangePlayer(player)}>{changeIcon}</Svg></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Fragment>
        )}
      </div>
    );
  }
}

TransfersPage.propTypes = {
  gameWeeks: PropTypes.array,
  teams: PropTypes.object,
  managersSeason: PropTypes.object,
};

TransfersPage.defaultProps = {
  gameWeeks: [],
  teams: {},
  managersSeason: {},
};

export default TransfersPage;
