import React from 'react';
import PropTypes from 'prop-types';

import Button from '@kammy-ui/button';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
import Interstitial from '@kammy-ui/interstitial';
import format from 'date-fns/format';

// import Team, { Fragment } from './components/Team';
import Players from './components/Players';

import './transferPage.scss';

const bem = bemHelper({ block: 'transfers-page' });

const formatTimestamp = (ts) => format(ts, 'MMM Do, HH:mm:ss');

class TransfersPage extends React.Component {
  state = {
    manager: null,
    changeType: null,
    playerIn: null,
    playerOut: null,
    searchStringIn: '',
    searchStringOut: '',
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.transfersSaving && !this.props.transfersSaving) {
    //  fetch updated transfers
      this.props.fetchTransfers(this.props.division);
    }
  }

  updateDisplayManager = (manager) => {
    this.setState({ manager });
  }

  updateChangeType = (changeType) => {
    this.setState({ changeType });
  }

  updateSearchIn = (searchStringIn) => {
    this.setState({ searchStringIn });
  }

  updateSearchOut = (searchStringOut) => {
    this.setState({ searchStringOut });
  }

  updatePlayerOut = (playerOut) => {
    this.setState({ playerOut: this.state.playerOut === playerOut ? null : playerOut });
  }

  updatePlayerIn = (playerIn) => {
    this.setState({ playerIn });
  }

  confirmTransfer = () => {
    const {
      playerIn, playerOut, changeType, manager,
    } = this.state;
    const { division, saveTransfers } = this.props;
    saveTransfers({
      division, transferIn: playerIn.value, transferOut: playerOut.value, type: changeType, manager,
    });
  }

  render() {
    const {
      teams, players, transfers, dateIsInCurrentGameWeek, transfersSaving, transfersLoading,
    } = this.props; /* divisionTeams, */
    const {
      manager, changeType, playerOut, playerIn, searchStringOut, searchStringIn,
    } = this.state;

    const currentTransfers = transfers.filter((transfer) => dateIsInCurrentGameWeek(transfer.timestamp));
    const allStepsComplete = playerIn && playerOut && changeType && manager;
    const loadingState = (transfersSaving || transfersLoading) ? 'loading' : '';
    const buttonState = !allStepsComplete ? 'disabled' : loadingState;

    return (
      <div className={bem(null, null, 'page-content')}>
        <h2>Make Transfers</h2>
        <MultiToggle
          label={'Who are you?'}
          id={'manager'}
          loading={Object.keys(teams).length === 0}
          options={Object.keys(teams)}
          checked={manager}
          onChange={this.updateDisplayManager}
        />
        <MultiToggle
          label={'What are you doing?'}
          id={'change-type'}
          options={['Loan', 'Swap', 'Trade', 'Transfer', 'Waiver']}
          checked={changeType}
          onChange={this.updateChangeType}
        />
        <div data-b-layout="row negative">
          <div data-b-layout='col pad'>
            <h3>Who is out?</h3>
            {/* {divisionTeams && divisionTeams[manager] ? ( */}
            {/* <Team */}
            {/* changePlayer={playerOut} */}
            {/* onSelect={this.updatePlayerOut} */}
            {/* team={divisionTeams[manager]} */}
            {/* /> */}
            {/* ) */}
            {/* : <Team placeholder />} */}
            {players && (
              <Players
                playerOut={playerOut}
                playerIn={playerIn}
                onSelect={this.updatePlayerOut}
                onSearch={this.updateSearchOut}
                searchString={searchStringOut}
                players={players}
              />
            )}
          </div>
          <div data-b-layout='col pad' className='transfer__final-step'>
            <h3>Who is in?</h3>
            {players && (
              <Players
                playerOut={playerOut}
                playerIn={playerIn}
                onSelect={this.updatePlayerIn}
                onSearch={this.updateSearchIn}
                searchString={searchStringIn}
                players={players}
              />
            )}
            {!players && (<Interstitial message='loading players...' />)}
          </div>
        </div>
        <div data-b-layout="row negative">
          <div data-b-layout='col pad'>
            <div className={'transfer__confirmation'}>
              <h3 style={{ marginTop: '1em' }}>Submit Transfer Request</h3>
              <p>
                <strong>{playerOut ? playerOut.label : ' who? '}</strong>
                {/* <strong>{playerOut ? `${playerOut.name} (${playerOut.pos})` : ' who? '}</strong> */}
            for
                <strong>{playerIn ? playerIn.label : ' who? '}</strong>
              </p>
              <div style={{ display: 'inline-block' }}>
                <Button onClick={this.confirmTransfer} state={buttonState}>
              Confirm {changeType}?
                </Button>
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ marginTop: '1em' }}>Requested Transfers</h2>
        <table className={'table'}>
          <thead>
            <tr className={'row'}>
              <th className={'cell'}>Timestamp</th>
              <th className={'cell'}>Status</th>
              <th className={'cell'}>Type</th>
              <th className={'cell'}>Manager</th>
              <th className={'cell'}>Transfer In</th>
              <th className={'cell'}>Transfer Out</th>
              <th className={'cell'}>Comment</th>
            </tr>
          </thead>
          <tbody>
            {currentTransfers.map((transfer) => (
              <tr className={'row'} key={transfer.timestamp}>
                <td className={'cell cell--left'}>{formatTimestamp(transfer.timestamp)}</td>
                <td className={`cell cell-status cell-status--${transfer.status} cell--center`}>{transfer.status}</td>
                <td className={'cell cell--center'}>{transfer.type}</td>
                <td className={'cell cell--center'}>{transfer.manager}</td>
                <td className={'cell cell--center'}>{transfer.transferIn}</td>
                <td className={'cell cell--center'}>{transfer.transferOut}</td>
                <td className={'cell cell--center'}>{transfer.comment}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={'row row--interstitial'}><td colSpan={7}>
              { (transfersSaving || transfersLoading) && (
                <Interstitial message='loading transfers...' />
              ) }
            </td></tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

TransfersPage.propTypes = {
  transfers: PropTypes.array,
  division: PropTypes.string.isRequired,
  gameWeeks: PropTypes.array,
  players: PropTypes.array,
  teams: PropTypes.object,
  divisionTeams: PropTypes.object,
  dateIsInCurrentGameWeek: PropTypes.func.isRequired,
  saveTransfers: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  transfersSaving: PropTypes.bool,
  playersLoaded: PropTypes.bool,
  transfersLoading: PropTypes.bool,
};

TransfersPage.defaultProps = {
  playersLoaded: false,
  transfersSaving: false,
  transfersLoading: false,
  transfers: [],
  gameWeeks: [],
  teams: {},
  divisionTeams: {},
};

export default TransfersPage;
