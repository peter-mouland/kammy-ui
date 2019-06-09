import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
import FormattedGameWeekDate from '@kammy-ui/game-week-date';

import './GameWeekSwitcher.scss';

const bem = bemHelper({ block: 'game-week-switcher' });
const INITIAL_GW_COUNT = 4;

class GameWeekSwitcher extends React.Component {
  state = {
    maxGameWeeks: INITIAL_GW_COUNT,
  }

  componentDidMount() {
    const { fetchGameWeeks, gameWeeksLoaded, gameWeeksLoading } = this.props;
    if (!gameWeeksLoaded && !gameWeeksLoading) fetchGameWeeks();
  }

  showAll = () => {
    const { maxGameWeeks } = this.state;
    const { gameWeeks } = this.props;
    this.setState({ maxGameWeeks: INITIAL_GW_COUNT === maxGameWeeks ? gameWeeks.length : INITIAL_GW_COUNT });
  }

  updateGameWeek = (intGameWeek) => {
    this.props.handleUpdate(intGameWeek);
  }

  render() {
    const { gameWeeks, currentGameWeek, selectedGameWeek } = this.props;
    const gameWeek = selectedGameWeek || currentGameWeek;
    const { maxGameWeeks } = this.state;
    const limitedGameWeeks = [...gameWeeks].splice(gameWeeks.length - maxGameWeeks, gameWeeks.length);
    const buttonText = maxGameWeeks === INITIAL_GW_COUNT ? 'Show all' : 'Hide';

    return (
      <section id="gameweek-switcher" className={bem()}>
        <MultiToggle
          label={'GameWeek'}
          id={'GameWeek'}
          checked={gameWeek}
          options={limitedGameWeeks.slice(0, currentGameWeek + 1).map((gw) => parseInt(gw.gameWeek, 10))}
          disabledOptions={[currentGameWeek + 1]}
          onChange={this.updateGameWeek}
          contextualHelp={(value) => (
            gameWeeks[value - 1] && <FormattedGameWeekDate gameWeek={gameWeeks[value - 1]}/>
          )}
        />
        <button onClick={this.showAll}>{buttonText}</button>
      </section>
    );
  }
}

GameWeekSwitcher.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  currentGameWeek: PropTypes.number.isRequired,
  selectedGameWeek: PropTypes.number,
  gameWeeks: PropTypes.array,
  gameWeeksLoading: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
};

GameWeekSwitcher.defaultProps = {
  selectedGameWeek: null,
  gameWeeksLoading: false,
  gameWeeksLoaded: false,
  gameWeeks: [],
  gameWeeksCount: null,
};

export default GameWeekSwitcher;
