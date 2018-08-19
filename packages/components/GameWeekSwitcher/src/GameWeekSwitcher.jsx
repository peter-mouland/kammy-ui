import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import FormattedGameWeekDate from './components/FormattedGameWeekDate';

const bem = bemHelper({ block: 'game-week-switcher' });

class GameWeekSwitcher extends React.Component {
  state = { }

  componentDidMount() {
    const { fetchGameWeeks, gameWeeksLoaded, gameWeeksLoading } = this.props;
    if (!gameWeeksLoaded && !gameWeeksLoading) fetchGameWeeks();
  }

  updateGameWeek = (intGameWeek) => {
    this.props.handleUpdate(intGameWeek);
  }

  render() {
    const { gameWeeks, currentGameWeek, selectedGameWeek } = this.props;
    const gameWeek = selectedGameWeek || currentGameWeek;

    return (
      <section id="gameweek-switcher" className={bem()}>
        <MultiToggle
          label={'GameWeek'}
          id={'GameWeek'}
          checked={gameWeek}
          options={gameWeeks.slice(0, currentGameWeek + 1).map((gw) => parseInt(gw.gameWeek, 10))}
          disabledOptions={[currentGameWeek + 1]}
          onChange={this.updateGameWeek}
          contextualHelp={(value) => gameWeeks[value - 1] && <FormattedGameWeekDate gameWeek={gameWeeks[value - 1]}/>}
        />
        {gameWeeks[gameWeek] && <FormattedGameWeekDate gameWeek={gameWeeks[gameWeek]}/>}
      </section>
    );
  }
}

GameWeekSwitcher.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  currentGameWeek: PropTypes.number.isRequired,
  selectedGameWeek: PropTypes.number.isRequired,
  gameWeeks: PropTypes.array,
  gameWeeksLoading: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
};

GameWeekSwitcher.defaultProps = {
  gameWeeksLoading: false,
  gameWeeksLoaded: false,
  gameWeeks: [],
  gameWeeksCount: null,
};

export default GameWeekSwitcher;
