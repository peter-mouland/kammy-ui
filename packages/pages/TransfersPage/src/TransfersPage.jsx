import React from 'react';
import PropTypes from 'prop-types';
import '@kammy-ui/bootstrap';

import Button from '@kammy-ui/button';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
import Interstitial from '@kammy-ui/interstitial';
import format from 'date-fns/format';

import Players from './components/Players';
import GameWeekTransfers from './components/game-week-transfers';
import { verbs, changeTypes } from './lib/consts';
import createFilteredPlayers from './lib/create-filtered-players';

import './transferPage.scss';

const bem = bemHelper({ block: 'transfers-page' });

class TransfersPage extends React.Component {
  state = {
    manager: null,
    changeType: null,
    playerIn: null,
    playerOut: null,
    playerDisplaced: null,
    playerGapFiller: null,
    comment: null,
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

  updateComment = (e) => {
    this.setState({ comment: e.target.value });
  }

  updateChangeType = (changeType) => {
    this.setState({ changeType });
  }

  updateGapFiller = (player) => {
    const { players } = this.props;
    this.setState({ playerGapFiller: player && players[player.value] });
  }

  updateDisplaced = (player) => {
    const { players } = this.props;
    this.setState({ playerDisplaced: player && players[player.value] });
  }

  updatePlayerOut = (player) => {
    const { players } = this.props;
    this.setState({ playerOut: player && players[player.value] });
  }

  updatePlayerIn = (player) => {
    const { players } = this.props;
    this.setState({ playerIn: player && players[player.value] });
  }

  confirmTransfer = () => {
    const {
      playerIn, playerOut, changeType, manager, playerDisplaced, playerGapFiller, comment,
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
        ...baseDetails,
        transferIn: playerGapFiller.name,
        transferOut: playerOut.name,
        comment: `${comment} (note: ${changeType} deal is ${playerIn.name} for ${playerOut.name}.)`,
      });
      transfers.push({
        ...baseDetails,
        transferIn: playerIn.name,
        transferOut: playerDisplaced.name,
        comment: `(note: ${changeType} deal is ${playerIn.name} for ${playerOut.name}.)`,
      });
    } else {
      transfers.push({
        ...baseDetails, transferIn: playerIn.name, transferOut: playerOut.name, comment,
      });
    }
    saveTransfers(transfers);
  }

  displacementQs = () => {
    const {
      changeType, playerOut, playerIn, playerDisplaced, playerGapFiller,
    } = this.state;
    const isTrade = changeType === changeTypes.TRADE;
    const isLoan = changeType === changeTypes.LOAN_START || changeType === changeTypes.LOAN_END;
    const show = (playerOut && playerIn && (isLoan || isTrade) && playerOut.pos !== playerIn.pos);
    const complete = !show || (show && playerDisplaced && playerGapFiller);
    return {
      complete,
      show,
    };
  }

  buttonState = () => {
    const { transfersSaving, transfersLoading } = this.props;
    const {
      manager, changeType, playerOut, playerIn,
    } = this.state;
    const { complete: displacementComplete } = this.displacementQs();
    const allStepsComplete = playerIn && playerOut && changeType && manager && displacementComplete;
    const loadingState = (transfersSaving || transfersLoading) ? 'loading' : '';
    return !allStepsComplete ? 'disabled' : loadingState;
  }

  render() {
    const {
      teams, playersArray, transfers, dateIsInCurrentGameWeek, pendingTransfers,
      transfersSaving, transfersLoading, gameWeeksLoading,
    } = this.props;
    const {
      manager, changeType, playerOut, playerIn,
    } = this.state;

    const gameWeekTransfers = gameWeeksLoading
      ? []
      : transfers.filter((transfer) => dateIsInCurrentGameWeek(transfer.timestamp));
    const verbIn = changeType ? verbs.in[changeType] : '...';
    const verbOut = changeType ? verbs.out[changeType] : '...';
    const { show: showDisplacementQuestions } = this.displacementQs();
    const buttonState = this.buttonState();
    const filteredPlayers = createFilteredPlayers({
      pendingTransfers: pendingTransfers[manager],
      playersArray,
      team: teams[manager],
      playerIn,
      playerOut,
    });

    return (
      <div className={bem(null, null, 'page-content')}>
        <h1>Transfers</h1>
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
              options={Object.values(changeTypes)}
              checked={changeType}
              onChange={this.updateChangeType}
            />
          </div>
        </div>
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <div>Who is {verbOut} out?</div>
            {playersArray.length > 0 && (
              <Players
                onSelect={this.updatePlayerOut}
                playersArray={filteredPlayers.out[changeType]}
                emptyStateMessage={'Let us know who you are first... and what type of change'}
              />
            )}
            {playersArray.length === 0 && (
              <Interstitial message='loading playersArray...' />
            )}
          </div>
        </div>
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <div>Who is {verbIn} in?</div>
            {playersArray.length > 0 && (
              <Players
                onSelect={this.updatePlayerIn}
                playersArray={filteredPlayers.in[changeType]}
                emptyStateMessage={'Let us know who you are first... and what type of change'}
              />
            )}
            {playersArray.length === 0 && (<Interstitial message='loading playersArray...' />)}
          </div>
        </div>

        {showDisplacementQuestions && (
          <div>
            <div data-b-layout="row negative v-space">
              <div data-b-layout='col pad'>
                <div>Who will fill the gap at {playerOut.pos}?</div>
                <Players
                  onSelect={this.updateGapFiller}
                  playersArray={filteredPlayers.gap[changeType]}
                />
              </div>
            </div>
            <div data-b-layout="row negative v-space">
              <div data-b-layout='col pad'>
                <div>Who will be displaced at {playerIn.pos}?</div>
                <Players
                  onSelect={this.updateDisplaced}
                  playersArray={filteredPlayers.displaced[changeType]}
                />
              </div>
            </div>
          </div>
        )}

        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <div>Banter Box</div>
            <textarea className='transfers-page__comment' onChange={this.updateComment} />
          </div>
        </div>

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
            <GameWeekTransfers
              transfers={gameWeekTransfers}
              isLoading={transfersSaving || transfersLoading || gameWeeksLoading}
            />
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
  pendingTransfers: PropTypes.object,
  dateIsInCurrentGameWeek: PropTypes.func.isRequired,
  saveTransfers: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  transfersSaving: PropTypes.bool,
  playersLoaded: PropTypes.bool,
  transfersLoading: PropTypes.bool,
  gameWeeksLoading: PropTypes.bool,
};

TransfersPage.defaultProps = {
  playersLoaded: false,
  transfersSaving: false,
  transfersLoading: false,
  gameWeeksLoading: false,
  transfers: [],
  gameWeeks: [],
  pendingTransfers: {},
  players: null,
  playersArray: null,
  teams: {},
};

export default TransfersPage;
