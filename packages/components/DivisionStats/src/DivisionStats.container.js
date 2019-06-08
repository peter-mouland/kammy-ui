import { connect } from 'react-redux';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as transferActions, selectors as transferSelectors } from '@kammy-ui/redux.transfers';
// import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';
import { withCookies } from 'react-cookie';

import DivisionStats from './DivisionStats';
import calculateManagerSeason from './lib/manager-season';

const { fetchDivision } = spreadsheetActions;
const { fetchAllPlayerData } = playerActions;
const { fetchGameWeeks } = gameWeekActions;
const { fetchTransfers } = transferActions;

function mapStateToProps(state, { divisionId }) {
  const players = playerSelectors.getAllPlayerData(state);
  const { gameWeeks, selectedGameWeek } = gameWeekSelectors.getGameWeeks(state);
  const { loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
  const { transfers } = transferSelectors.getValidTransfers(state, divisionId);
  const {
    loaded: transfersLoaded, loading: transfersLoading, errors: transfersErrors,
  } = transferSelectors.getStatus(state, divisionId);

  const props = {
    selectedGameWeek,
    gameWeeksLoaded,
    players: players.data,
    playersCount: players.count,
    playersLoading: players.loading,
    playersLoaded: players.loaded,
    playersErrors: players.errors,
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
    players.loaded
    && transfersLoaded
    && gameWeeksLoaded
    && divisionLoaded
  );
  const managersSeason = loaded ? calculateManagerSeason({
    teams: division,
    gameWeeks,
    players: players.data,
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
  fetchAllPlayerData: () => dispatch(fetchAllPlayerData()),
  fetchDivision: (division) => dispatch(fetchDivision(division)),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(DivisionStats));
