import React from 'react';
import PropTypes from 'prop-types';

import Button from '@kammy-ui/button';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
import Interstitial from '@kammy-ui/interstitial';
import format from 'date-fns/format';

// import Team from './components/Team';
import Players from './components/Players';

import './transferPage.scss';

const bem = bemHelper({ block: 'transfers-page' });

const formatTimestamp = (ts) => format(ts, 'MMM Do, HH:mm:ss');

const getEmoji = (status = '') => {
  switch (status.toLowerCase()) {
  case 'tbc': return '&#129300;';
  case 'e': return '&#129324;';
  case 'y': return '&#129303;';
  default: return '';
  }
};

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
    } = this.props; /* divisionTeams,  */
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
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <div>Who are you?</div>
            <MultiToggle
              id={'manager'}
              loading={Object.keys(teams).length === 0}
              loadingMessage={'loading teams...'}
              options={Object.keys(teams)}
              checked={manager}
              onChange={this.updateDisplayManager}
            />
          </div>
        </div>
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <div>What are you doing?</div>
            <MultiToggle
              id={'change-type'}
              options={['Loan', 'Swap', 'Trade', 'Transfer', 'Waiver']}
              checked={changeType}
              onChange={this.updateChangeType}
            />
          </div>
        </div>
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <div>Who is out?</div>
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
            {!players && (<Interstitial message='loading players...' />)}
          </div>
        </div>
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <div>Who is in?</div>
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
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            {allStepsComplete && (
              <p>
                <strong>{playerOut.label}</strong>
              for
                <strong>{playerIn.label}</strong>
              </p>
            )}
            <div style={{ display: 'inline-block' }}>
              <Button onClick={this.confirmTransfer} state={buttonState}>
              Confirm {changeType}
              </Button>
            </div>
          </div>
        </div>
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <h2 >Requested Transfers</h2>
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
                {currentTransfers.map(({
                  timestamp, status = '', type, manager: mgr, transferIn, transferOut, comment,
                }) => (
                  <tr className={`row row--${status.toLowerCase()}`} key={timestamp}>
                    <td className={'cell cell--status cell--center'} dangerouslySetInnerHTML={{ __html: `${status} ${getEmoji(status)}` }} />
                    <td className={'cell cell--left'}>{formatTimestamp(timestamp)}</td>
                    <td className={'cell cell--center'}>{type}</td>
                    <td className={'cell cell--center'}>{mgr}</td>
                    <td className={'cell cell--center'}>{transferIn}</td>
                    <td className={'cell cell--center'}>{transferOut}</td>
                    <td className={'cell cell--center'}>{comment}</td>
                  </tr>
                ))}
                {currentTransfers.length === 0 && !transfersSaving && !transfersLoading && (
                  <tr className={'row'}>
                    <td className={'cell cell--center'} colSpan={7}><em>no transfers have been requested</em></td>
                  </tr>
                )}
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
        </div>
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
