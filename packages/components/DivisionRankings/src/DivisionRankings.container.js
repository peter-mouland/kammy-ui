import { connect } from 'react-redux';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as transferActions, selectors as transferSelectors } from '@kammy-ui/redux.transfers';
import { selectors as divisionSelectors, actions as divisionActions } from '@kammy-ui/redux.division';
import { selectors as draftSetupSelectors } from '@kammy-ui/redux.draft-setup';

import DivisionStats from './DivisionRankings';

const { fetchTransfers } = transferActions;
const { fetchDivision } = divisionActions;
const { fetchGameWeeks } = gameWeekActions;
const { fetchAllPlayerData } = playerActions;

function mapStateToProps(state, { divisionId }) {
  const players = playerSelectors.getAllPlayerData(state);
  const managersSeason = divisionSelectors[divisionId].season(state) || {};
  const { points: managersPoints, lineChart: lineChartData } = divisionSelectors[divisionId].stats(state);
  const { current: managersRank, change: managersRankChange } = divisionSelectors[divisionId].rank(state);
  const { selectedGameWeek, currentGameWeek } = gameWeekSelectors.getGameWeeks(state);
  const { loaded: transfersLoaded } = transferSelectors.getStatus(state, divisionId);
  const { loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
  const { loaded: divisionLoaded } = divisionSelectors.getStatus(state, divisionId);
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
    lineChartData: lineChartData.splice(0, selectedGameWeek + 1),
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
