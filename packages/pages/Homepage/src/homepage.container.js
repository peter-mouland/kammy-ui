import { connect } from 'react-redux';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';

import Homepage from './homepage';

const { fetchGameWeeks } = gameWeekActions;
const { fetchAllPlayerData } = playerActions;

function mapStateToProps(state) {
  const players = playerSelectors.getAllPlayerData(state);
  const { loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
  const gameWeeks = gameWeekSelectors.getGameWeeks(state);

  const loaded = (
    players.loaded
    && gameWeeksLoaded
  );

  return {
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
