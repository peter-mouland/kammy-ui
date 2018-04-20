import { connect } from 'react-redux';
import { actions } from '@kammy-ui/redux-fixtures';

import GameWeekFixturesTable from './GameWeekFixtures.table';

const { fetchFixtures } = actions;

function mapStateToProps(state) {
  console.log(state.fixtures)
  return {
    fixtures: state.fixtures.data,
    loading: state.fixtures.loading,
    errors: state.fixtures.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchFixtures },
)(GameWeekFixturesTable);
