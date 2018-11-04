import { connect } from 'react-redux';
import { actions as cupActions, selectors as cupSelectors } from '@kammy-ui/redux.cup';

import Cup from './Cup';

function mapStateToProps(state) {
  const { draftCup, loaded } = cupSelectors.getDraftCup(state);
  return {
    draftCup,
    draftCupLoaded: loaded,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchCup: () => dispatch(cupActions.fetchDraftCup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cup);
