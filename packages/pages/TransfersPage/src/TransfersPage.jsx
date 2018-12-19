import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import Team from './components/Team';
import Players from './components/Players';

import './transferPage.scss';

const bem = bemHelper({ block: 'transfers-page' });

class TransfersPage extends React.Component {
  state = {
    displayManager: null,
    changeType: null,
    playerIn: null,
    playerOut: null,
    searchString: '',
  }

  updateDisplayManager = (displayManager) => {
    this.setState({ displayManager });
  }

  updateChangeType = (changeType) => {
    this.setState({ changeType });
  }

  updateSearch = (searchString) => {
    this.setState({ searchString });
  }

  updatePlayerOut = (playerOut) => {
    this.setState({ playerOut: this.state.playerOut === playerOut ? null : playerOut });
  }

  updatePlayerIn = (playerIn) => {
    this.setState({ playerIn });
  }

  confirmTransfer = () => {
    const { playerIn, playerOut, changeType } = this.state;
    console.log({ playerIn, playerOut, changeType });
  }

  getStep = () => {
    const {
      displayManager, changeType, playerOut, playerIn,
    } = this.state;
    switch (true) {
    case !!playerIn: return 4;
    case !!playerOut: return 4;
    case !!changeType: return 3;
    case !!displayManager: return 2;
    default: return 1;
    }
  }

  getInvalidTeams = () => null;

  render() {
    const {
      teams, players, divisionTeams, transfers, dateIsInCurrentGameWeek,
    } = this.props;
    const {
      displayManager, changeType, playerOut, playerIn, searchString,
    } = this.state;

    const step = this.getStep();
    const currentTransfers = transfers.filter((transfer) => dateIsInCurrentGameWeek(transfer.timestamp));

    return (
      <div className={bem(null, null, 'page-content')}>
        <h2>Current Transfers</h2>
        <table className={'table'}>
          <thead>
            <tr>
              <td>Timestamp</td>
              <td>Manager</td>
              <td>Comment</td>
              <td>Status</td>
              <td>Transfer In</td>
              <td>Transfer Out</td>
              <td>Type</td>
            </tr>
          </thead>
          <tbody>
            {currentTransfers.map((transfer) => (
              <tr key={transfer.timestamp}>
                <td>{transfer.timestamp}</td>
                <td>{transfer.status}</td>
                <td>{transfer.manager}</td>
                <td>{transfer.comment}</td>
                <td>{transfer.transferIn}</td>
                <td>{transfer.transferOut}</td>
                <td>{transfer.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>New Transfers</h2>
        <MultiToggle
          label={'Who are you?'}
          id={'manager'}
          options={Object.keys(teams)}
          checked={displayManager}
          onChange={this.updateDisplayManager}
        />
        {step > 1 && (
          <MultiToggle
            label={'What are you doing?'}
            id={'change-type'}
            options={['Loan', 'Swap', 'Trade', 'Transfer', 'Waiver']}
            checked={changeType}
            onChange={this.updateChangeType}
          />
        )}
        {step > 2 && (
          <Team
            changePlayer={playerOut}
            onSelect={this.updatePlayerOut}
            team={divisionTeams[displayManager]}
          />
        )}
        {step > 3 && players && (
          <Players
            playerOut={playerOut}
            playerIn={playerIn}
            onSelect={this.updatePlayerIn}
            onSearch={this.updateSearch}
            searchString={searchString}
            players={players}
          />
        )}
        {playerIn && playerOut && changeType && (
          <div>
            <p><strong>{playerIn.label}</strong> for <strong>{playerOut.name} ({playerOut.pos})</strong></p>
            <div>
              <button type='button' onClick={this.confirmTransfer}>
                Confirm {changeType}?
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

TransfersPage.propTypes = {
  transfers: PropTypes.array,
  gameWeeks: PropTypes.array,
  players: PropTypes.array,
  teams: PropTypes.object,
  divisionTeams: PropTypes.object,
  dateIsInCurrentGameWeek: PropTypes.func.isRequired,
};

TransfersPage.defaultProps = {
  transfers: [],
  gameWeeks: [],
  teams: {},
  divisionTeams: {},
};

export default TransfersPage;
