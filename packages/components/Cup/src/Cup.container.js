import { connect } from 'react-redux';
import { actions as cupActions, selectors as cupSelectors } from '@kammy-ui/redux.cup';

import Cup from './Cup';

const { fetchCup } = cupActions;

function mapStateToProps(state) {
  const { data: cupGroups } = cupSelectors.cupGroups(state);
  const { managers, groups, rounds } = cupSelectors.getCupMetaData(state);
  const { loaded: cupLoaded } = cupSelectors.getStatus(state);
  return {
    managers,
    groups,
    rounds,
    cupLoaded,
    cupGroups,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchCup: () => dispatch(fetchCup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cup);
