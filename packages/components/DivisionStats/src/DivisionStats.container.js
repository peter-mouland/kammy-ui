import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as transferActions, selectors as transferSelectors } from '@kammy-ui/redux.transfers';
// import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';

import DivisionStats from './DivisionStats';
import calculateManagerSeason from './lib/manager-season';

const { fetchDivision } = spreadsheetActions;
const { fetchAllPlayerData: fetchDbPlayers } = dbActions;
const { fetchGameWeeks } = gameWeekActions;
const { fetchTransfers } = transferActions;

function mapStateToProps(state, ownProps) {
  const { divisionId } = ownProps;
  const { gameWeeks, selectedGameWeek } = gameWeekSelectors.getGameWeeks(state);
  const { loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
  const { transfers } = transferSelectors.getValidTransfers(state, divisionId);
  const {
    loaded: transfersLoaded, loading: transfersLoading, errors: transfersErrors,
  } = transferSelectors.getStatus(state, divisionId);

  const props = {
    selectedGameWeek,
    gameWeeksLoaded,
    players: state.players.data,
    playersCount: state.players.count,
    playersLoading: state.players.loading,
    playersLoaded: state.players.loaded,
    playersErrors: state.players.errors,
    divisionId,
    transfers,
    transfersCount: transfers.length,
    transfersLoading,
    transfersLoaded,
    transfersErrors,
  };
  const division = state.spreadsheet[divisionId];
  const divisionLoaded = state.spreadsheet[`${divisionId}Loaded`];

  const loaded = (
    state.players.loaded
    && transfersLoaded
    && gameWeeksLoaded
    && divisionLoaded
  );
  const managersSeason = loaded ? calculateManagerSeason({
    teams: division,
    gameWeeks,
    players: props.players,
    transfers,
    withStats: true,
  }) : null;

  return {
    ...props,
    division,
    divisionLoaded,
    managersSeason,
    loaded,
  };
}


const mapDispatchToProps = (dispatch) => ({
  fetchGameWeeks: () => dispatch(fetchGameWeeks()),
  fetchTransfers: (division) => dispatch(fetchTransfers(division)),
  fetchDbPlayers: () => dispatch(fetchDbPlayers()),
  fetchDivision: (division) => dispatch(fetchDivision(division)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DivisionStats);
