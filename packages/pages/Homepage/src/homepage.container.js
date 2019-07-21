import { connect } from 'react-redux';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { selectors as draftSetupSelectors } from '@kammy-ui/redux.draft-setup';

import Homepage from './homepage';

const { fetchGameWeeks } = gameWeekActions;
const { fetchAllPlayerData } = playerActions;

function mapStateToProps(state) {
  const players = playerSelectors.getAllPlayerData(state);
  const { loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
  const { loaded: draftSetupLoaded } = draftSetupSelectors.getStatus(state);
  const { divisions } = draftSetupSelectors.getDraftSetup(state);
  const gameWeeks = gameWeekSelectors.getGameWeeks(state);

  const loaded = (
    players.loaded
    && gameWeeksLoaded
    && draftSetupLoaded
  );

  return {
    divisions,
    loaded,
    gameWeeksLoaded,
    playersLoaded: players.loaded,
    gameWeeks,
  };
}

const mapDispatchToProps = {
  fetchGameWeeks,
  fetchAllPlayerData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
