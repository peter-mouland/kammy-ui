import { connect } from 'react-redux';
import { actions as cupActions, selectors as cupSelectors } from '@kammy-ui/redux.cup';

import Cup from './Cup';

function mapStateToProps(state) {
  const { data: cupGroups } = cupSelectors.cupGroups(state);
  const { managers, groups, rounds } = cupSelectors.getCupMetaData(state);
  const { loaded: cupLoaded } = cupSelectors.getStatus(state);
  const { data: teams } = cupSelectors.teams(state);

  return {
    managers,
    groups,
    rounds,
    cupLoaded,
    cupGroups,
    teams,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchCup: () => dispatch(cupActions.fetchCup()),
  saveCupTeam: (args) => dispatch(cupActions.saveCupTeam(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cup);
