import React from 'react';
import PropTypes from 'prop-types';
import '@kammy-ui/bootstrap';
import Select from 'react-select';
import Modal from '@kammy-ui/modal';

import Button from '@kammy-ui/button';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
// import Interstitial from '@kammy-ui/interstitial';
import format from 'date-fns/format';

import Players from './components/Players';
import GameWeekTransfers from './components/game-week-transfers';
import { changeTypes } from './lib/consts';
import createFilteredPlayers from './lib/create-filtered-players';

import './transferPage.scss';

const bem = bemHelper({ block: 'transfers-page' });

const createFilterOptions = (managers = [], manager) => {
  const positions = [
    { value: 'GK', label: 'GK', group: 'position' },
    { value: 'CB', label: 'CB', group: 'position' },
    { value: 'FB', label: 'FB', group: 'position' },
    { value: 'MID', label: 'MID', group: 'position' },
    { value: 'AM', label: 'AM', group: 'position' },
    { value: 'STR', label: 'STR', group: 'position' },
  ];
  return [
    {
      label: 'Managers',
      options: [
        ...managers
          .map((mngr) => ({ value: mngr, label: `${mngr}${mngr === manager ? '*' : ''}`, group: 'manager' })),
      ],
    },
    {
      label: 'Positions',
      options: positions,
    },
  ];
};

class TransfersPage extends React.Component {
  state = {
    manager: null,
    changeType: null,
    playerIn: null,
    playerOut: null,
    playerDisplaced: null,
    playerGapFiller: null,
    comment: null,
    initiateRequest: false,
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.transfersSaving && !this.props.transfersSaving) {
      //  fetch updated transfers
      this.props.fetchTransfers(this.props.division);
    }
  }

  updateDisplayManager = (manager) => {
    this.setState({ manager });
  }

  initiateRequest = (initiateRequest) => {
    if (initiateRequest) {
      this.setState({ initiateRequest });
    } else {
      // closing modal so clear the old selections out
      this.setState({
        initiateRequest,
        selectedOptions: null,
        changeType: null,
        playerIn: null,
        playerOut: null,
        playerDisplaced: null,
        playerGapFiller: null,
        comment: null,
      });
    }
  }

  updateComment = (e) => {
    this.setState({ comment: e.target.value });
  }

  updateChangeType = (changeType) => {
    this.setState({ changeType });
  }

  updatePlayerFilter = (selectedOptions) => {
    this.setState({ selectedOptions });
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
    this.initiateRequest(false);
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
    // const { complete: displacementComplete } = this.displacementQs();
    const allStepsComplete = playerIn && playerOut && changeType && manager;// && displacementComplete;
    const loadingState = (transfersSaving || transfersLoading) ? 'loading' : '';
    return !allStepsComplete ? 'disabled' : loadingState;
  }

  render() {
    const {
      teams, playersArray, transfers, dateIsInCurrentGameWeek, pendingTransfers,
      transfersSaving, transfersLoading, gameWeeksLoading, label,
    } = this.props;
    const {
      manager, changeType, playerOut, playerIn, selectedOptions, initiateRequest, comment,
    } = this.state;

    const gameWeekTransfers = gameWeeksLoading
      ? []
      : transfers.filter((transfer) => dateIsInCurrentGameWeek(transfer.timestamp, 2));

    // const { show: showDisplacementQuestions } = this.displacementQs();
    const buttonState = this.buttonState();
    const filteredPlayers = createFilteredPlayers({
      selectedOptions: selectedOptions || [],
      pendingTransfers: pendingTransfers[manager],
      playersArray,
      team: teams[manager],
      teams,
      playerIn,
      playerOut,
    });
    const filterOptions = createFilterOptions(Object.keys(teams), manager);
    const stillLoading = transfersSaving || transfersLoading || gameWeeksLoading;
    const defaultLeavingFilter = null; // filterOptions[1].options.filter((option) => option.value === manager);

    return (
      <div className={bem(null, null, 'page-content')} data-b-layout="container">
        <h1>{label}</h1>
        <div data-b-layout="row negative v-space">
          <div data-b-layout='col pad'>
            <h2>Transfer Requests</h2>
            <GameWeekTransfers
              transfers={gameWeekTransfers}
              isLoading={transfersSaving || transfersLoading || gameWeeksLoading}
            />
            <button onClick={() => this.initiateRequest(true)} disabled={stillLoading}>Create Request</button>
          </div>
        </div>
        {initiateRequest && (
          <Modal
            id={'new-transfer-request'}
            title={'New Transfer Request'}
            open={true}
            onClose={() => this.initiateRequest(false)}
          >
            {!manager && (
              <React.Fragment>
                <h4>1. Who are you?</h4>
                <MultiToggle
                  id={'manager'}
                  loading={Object.keys(teams).length === 0}
                  loadingMessage={'loading teams...'}
                  options={Object.keys(teams)}
                  checked={manager}
                  onChange={this.updateDisplayManager}
                />
              </React.Fragment>
            )}
            {manager && !changeType && (
              <React.Fragment>
                <h4>2. What type of request is it?</h4>
                <MultiToggle
                  id={'change-type'}
                  options={Object.values(changeTypes)}
                  checked={changeType}
                  onChange={this.updateChangeType}
                />
              </React.Fragment>
            )}
            {manager && changeType && !playerOut && (
              <React.Fragment>
                <h3>3. Who is Leaving the squad?</h3>
                <div style={{ position: 'relative', zIndex: '2' }}>
                  <Select
                    defaultValue={defaultLeavingFilter}
                    placeholder="player filter..."
                    options={filterOptions}
                    isMulti
                    name={'playersFiltersOut'}
                    onChange={this.updatePlayerFilter}
                  />
                </div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  {playersArray.length > 0 && (
                    <Players
                      onSelect={this.updatePlayerOut}
                      playersArray={filteredPlayers.sortedPlayers}
                    />
                  )}
                </div>
              </React.Fragment>
            )}
            {manager && changeType && playerOut && !playerIn && (
              <React.Fragment>
                <h3>4. Who is Joining the squad?</h3>
                <div style={{ position: 'relative', zIndex: '2' }}>
                  <Select
                    placeholder="player filter..."
                    options={filterOptions}
                    isMulti
                    name={'playersFiltersIn'}
                    onChange={this.updatePlayerFilter}
                  />
                </div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  {playersArray.length > 0 && (
                    <Players
                      onSelect={this.updatePlayerIn}
                      playersArray={filteredPlayers.sortedPlayers}
                    />
                  )}
                </div>
              </React.Fragment>
            )}
            {manager && changeType && playerOut && playerIn && (
              <React.Fragment>
                <h3>Any Comments / Banter?</h3>
                <textarea className='transfers-page__comment' onChange={this.updateComment} />
                <h3>Confirm Request</h3>
                <GameWeekTransfers
                  transfers={[{
                    manager,
                    timestamp: new Date(),
                    status: 'tbc',
                    type: changeType,
                    transferIn: playerIn ? playerIn.name : '',
                    transferOut: playerOut ? playerOut.name : '',
                    comment,
                  }]}
                  isLoading={false}
                  Action={(
                    <Button onClick={this.confirmTransfer} state={buttonState}>
                      Confirm {changeType}
                    </Button>
                  )}
                />
              </React.Fragment>
            )}
          </Modal>
        )}

        {/* {showDisplacementQuestions && ( */}
        {/*  <div> */}
        {/*    <div data-b-layout="row negative v-space"> */}
        {/*      <div data-b-layout='col pad'> */}
        {/*        <div>Who will fill the gap at {playerOut.pos}?</div> */}
        {/*        <Players */}
        {/*          onSelect={this.updateGapFiller} */}
        {/*          playersArray={filteredPlayers.gap[changeType]} */}
        {/*        /> */}
        {/*      </div> */}
        {/*    </div> */}
        {/*    <div data-b-layout="row negative v-space"> */}
        {/*      <div data-b-layout='col pad'> */}
        {/*        <div>Who will be displaced at {playerIn.pos}?</div> */}
        {/*        <Players */}
        {/*          onSelect={this.updateDisplaced} */}
        {/*          playersArray={filteredPlayers.displaced[changeType]} */}
        {/*        /> */}
        {/*      </div> */}
        {/*    </div> */}
        {/*  </div> */}
        {/* )} */}
      </div>
    );
  }
}

TransfersPage.propTypes = {
  transfers: PropTypes.array,
  label: PropTypes.string.isRequired,
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
