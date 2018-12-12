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
    this.setState({ playerOut: this.state.playerOut ? null : playerOut });
  }

  updatePlayerIn = (playerIn) => {
    this.setState({ playerIn: this.state.playerIn ? null : playerIn });
  }

  swapPlayer = (swapPlayer) => {
    this.setState({ swapPlayer });
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
    const { teams, managersSeason, players } = this.props;
    const {
      displayManager, changeType, playerOut, playerIn, searchString,
    } = this.state;

    const intGameWeek = 39;
    const step = this.getStep();
    // const invalidTeams = this.getInvalidTeams();

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
            intGameWeek={intGameWeek}
            onSelect={this.updatePlayerOut}
            team={managersSeason[displayManager]}
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
      </div>
    );
  }
}

TransfersPage.propTypes = {
  gameWeeks: PropTypes.array,
  players: PropTypes.array,
  teams: PropTypes.object,
  managersSeason: PropTypes.object,
};

TransfersPage.defaultProps = {
  gameWeeks: [],
  teams: {},
  managersSeason: {},
};

export default TransfersPage;
