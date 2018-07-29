import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import Swap from './components/Sub';
import Team from './components/Team';
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

  swapPlayer = (swapPlayer) => {
    this.setState({ swapPlayer });
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
            label={'What type of team-sheet change?'}
            id={'change-type'}
            options={['Loan', 'Swap', 'Trade', 'Transfer', 'Waiver']}
            checked={changeType}
            onChange={this.updateChangeType}
          />
        )}
        {step > 2 && changeType !== 'Swap' && (
          <Team
            changePlayer={changePlayer}
            changeType={changeType}
            intGameWeek={intGameWeek}
            updateChangePlayer={this.updateChangePlayer}
            team={managersSeason[displayManager]}
          />
        )}
        {step > 2 && changeType === 'Swap' && (
          <Swap
            intGameWeek={intGameWeek}
            updateChangePlayer={this.swapPlayer}
            team={managersSeason[displayManager]}
          />
        )}
        {step > 3 && (
          <Swap
            changePlayer={changePlayer}
            intGameWeek={intGameWeek}
            updateChangePlayer={this.swapPlayer}
            team={managersSeason[displayManager]}
          />
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
