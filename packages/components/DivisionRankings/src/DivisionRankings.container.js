import { connect } from 'react-redux';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as transferActions, selectors as transferSelectors } from '@kammy-ui/redux.transfers';
import { selectors as divisionSelectors } from '@kammy-ui/redux.division';
import { selectors as draftSetupSelectors } from '@kammy-ui/redux.draft-setup';

import DivisionStats from './DivisionRankings';

const { fetchTransfers } = transferActions;
const { fetchDivision } = spreadsheetActions;
const { fetchGameWeeks } = gameWeekActions;
const { fetchAllPlayerData } = playerActions;

function mapStateToProps(state, { divisionId }) {
  const players = playerSelectors.getAllPlayerData(state);
  const managersSeason = divisionSelectors[`${divisionId}Season`](state) || {};
  const managersPoints = divisionSelectors[`${divisionId}Points`](state);
  const managersRank = divisionSelectors[`${divisionId}Rank`](state);
  const managersRankChange = divisionSelectors[`${divisionId}RankChange`](state);
  const lineChartData = divisionSelectors[`${divisionId}LineChart`](state);
  const { loaded: transfersLoaded } = transferSelectors.getStatus(state, divisionId);
  const { loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
  const divisionLoaded = state.spreadsheet[`${divisionId}Loaded`];
  const { loaded: draftSetupLoaded } = draftSetupSelectors.getStatus(state);
  const { byDivision } = draftSetupSelectors.getDraftSetup(state);

  const loaded = (
    draftSetupLoaded
    && players.loaded
    && transfersLoaded
    && gameWeeksLoaded
    && divisionLoaded
  );

  return {
    playersLoaded: players.loaded,
    gameWeeksLoaded,
    transfersLoaded,
    divisionLoaded,
    managers: byDivision.managers[divisionId],
    managersSeason,
    managersPoints,
    managersRank,
    managersRankChange,
    lineChartData,
    loaded,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchGameWeeks: () => dispatch(fetchGameWeeks()),
  fetchTransfers: (division) => dispatch(fetchTransfers(division)),
  fetchAllPlayerData: () => dispatch(fetchAllPlayerData()),
  fetchDivision: (division) => dispatch(fetchDivision(division)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DivisionStats);
