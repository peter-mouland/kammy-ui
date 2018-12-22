import React from 'react';
import PropTypes from 'prop-types';

import Button from '@kammy-ui/button';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
import Interstitial from '@kammy-ui/interstitial';
import format from 'date-fns/format';

import Players from './components/Players';

import './transferPage.scss';

const bem = bemHelper({ block: 'transfers-page' });

const formatTimestamp = (ts) => format(ts, 'MMM Do, HH:mm:ss');

const changeTypes = {
  TRADE: 'Trade',
  LOAN: 'Loan',
  SWAP: 'Swap',
  TRANSFER: 'Transfer',
  WAIVER: 'Waiver',
};

const verbs = {
  out: {
    [changeTypes.LOAN]: 'being loaned',
    [changeTypes.SWAP]: 'being swapped',
    [changeTypes.TRADE]: 'being traded',
    [changeTypes.TRANSFER]: 'being transferred',
    [changeTypes.WAIVER]: 'being taken',
  },
  in: {
    [changeTypes.LOAN]: 'being brought',
    [changeTypes.SWAP]: 'being swapped',
    [changeTypes.TRADE]: 'being traded',
    [changeTypes.TRANSFER]: 'being transferred',
    [changeTypes.WAIVER]: 'being brought',
  },
};

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
    playerDisplaced: null,
    playerGapFiller: null,
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

  updateGapFiller = ({ value }) => {
    const { players } = this.props;
    const { playerGapFiller } = this.state;
    this.setState({ playerGapFiller: playerGapFiller === players[value].name ? null : players[value] });
  }

  updateDisplaced = ({ value }) => {
    const { players } = this.props;
    const { playerDisplaced } = this.state;
    this.setState({ playerDisplaced: playerDisplaced === players[value].name ? null : players[value] });
  }

  updatePlayerOut = ({ value }) => {
    const { players } = this.props;
    const { playerOut } = this.state;
    this.setState({ playerOut: playerOut === players[value].name ? null : players[value] });
  }

  updatePlayerIn = ({ value }) => {
    const { players } = this.props;
    const { playerIn } = this.state;
    this.setState({ playerIn: playerIn === players[value].name ? null : players[value] });
  }

  confirmTransfer = () => {
    const {
      playerIn, playerOut, changeType, manager, playerDisplaced, playerGapFiller,
    } = this.state;
    const { division, saveTransfers } = this.props;
    const timestamp = format(new Date(), 'DD/MM/YYYY HH:mm:ss');
    const baseDetails = {
      timestamp, division, manager, status: 'TBC', transferType: changeType,
    };
    const transfers = [];
    if (playerDisplaced && playerGapFiller) {
      // rearrange transfer to ensure positions match for the spreadsheet
      transfers.push({
        ...baseDetails, transferIn: playerGapFiller.name, transferOut: playerOut.name,
      });
      transfers.push({
        ...baseDetails, transferIn: playerIn.name, transferOut: playerDisplaced.name,
      });
    } else {
      transfers.push({
        ...baseDetails, transferIn: playerIn.name, transferOut: playerOut.name,
      });
    }
    saveTransfers(transfers);
  }

  render() {
    const {
      teams, playersArray, transfers, dateIsInCurrentGameWeek, transfersSaving, transfersLoading,
    } = this.props; /* divisionTeams,  */
    const {
      manager, changeType, playerOut, playerIn, playerDisplaced, playerGapFiller,
    } = this.state;

    const currentTransfers = transfers.filter((transfer) => dateIsInCurrentGameWeek(transfer.timestamp));
    const loadingState = (transfersSaving || transfersLoading) ? 'loading' : '';
    const verbIn = changeType ? verbs.in[changeType] : '...';
    const verbOut = changeType ? verbs.out[changeType] : '...';
    const showTradeQuestions = (
      playerOut && playerIn && changeType === changeTypes.TRADE && playerOut.pos !== playerIn.pos
    );
    const tradeQuestionsComplete = !showTradeQuestions || (showTradeQuestions && playerDisplaced && playerGapFiller);
    const allStepsComplete = playerIn && playerOut && changeType && manager && tradeQuestionsComplete;
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
            <div>What type of change are you making?</div>
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
            <div>Who is {verbOut} out?</div>
            {playersArray && (
              <Players
                onSelect={this.updatePlayerOut}
                playersArray={playersArray}
              />
            )}
            {!playersArray && (<Interstitial message='loading playersArray...' />)}
          </div>
        </div>
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <div>Who is {verbIn} in?</div>
            {playersArray && (
              <Players
                onSelect={this.updatePlayerIn}
                playersArray={playersArray}
              />
            )}
            {!playersArray && (<Interstitial message='loading playersArray...' />)}
          </div>
        </div>

        {showTradeQuestions && (
          <div>
            <div data-b-layout="row negative v-space">
              <div data-b-layout='col pad'>
                <div>Who will fill the gap at {playerOut.pos}?</div>
                <Players
                  onSelect={this.updateGapFiller}
                  playersArray={playersArray}
                  playersFilter={({ pos }) => pos === playerOut.pos}
                />
              </div>
            </div>
            <div data-b-layout="row negative v-space">
              <div data-b-layout='col pad'>
                <div>Who will be displaced at {playerIn.pos}?</div>
                <Players
                  onSelect={this.updateDisplaced}
                  playersArray={playersArray}
                  playersFilter={({ pos }) => pos === playerIn.pos}
                />
              </div>
            </div>
          </div>
        )}

        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
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
  players: PropTypes.object,
  playersArray: PropTypes.array,
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
  players: null,
  playersArray: null,
  teams: {},
  divisionTeams: {},
};

export default TransfersPage;
