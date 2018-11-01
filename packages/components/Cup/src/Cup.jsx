import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import PlayerPicker from './components/player-picker';

const bem = bemHelper({ block: 'division-stats' });

const Player = ({ team, cupTeam, player }) => {
  const { name, points } = cupTeam[`player${player}`];
  return name
    ? (
      <React.Fragment>
        <td className={'cell'}>{name}</td>
        <td className={'cell'}>{points}</td>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <td className={'cell'}><PlayerPicker team={team} /></td>
        <td></td>
      </React.Fragment>
    );
};

const PlayerProps = {
  code: PropTypes.number,
  name: PropTypes.string,
  points: PropTypes.number,
  rank: PropTypes.number,
};

Player.propTypes = {
  cupTeam: PropTypes.shape({
    player1: PropTypes.shape(PlayerProps),
    player2: PropTypes.shape(PlayerProps),
    player3: PropTypes.shape(PlayerProps),
    player4: PropTypes.shape(PlayerProps),
  }).isRequired,
  player: PropTypes.number.isRequired,
  manager: PropTypes.string,
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    picked: PropTypes.bool,
  })),
};

class Cup extends React.Component {
  state = { }

  componentDidMount() {
    const { cupLoaded, fetchCup } = this.props;
    if (!cupLoaded) fetchCup();
  }

  render() {
    const {
      cupLoaded, cupGroups, label = 'Cup', groups, rounds, teams,
    } = this.props;

    return (
      <section id="cup-page" className={bem()}>
        <h1>{label}</h1>
        {!cupLoaded && (
          <Fragment>
            <Interstitial /> Data Gathering...
          </Fragment>
        )}
        <table className={'table'}>
          {
            rounds.map((round) => (
              <Fragment key={`${round}`}>
                <thead>
                  <tr className={'row'}>
                    <th className={'cell'} colSpan={11}>Round {round}</th>
                  </tr>
                </thead>
                {
                  groups.map((group) => (
                    <tbody key={`${group}-${round}`} >
                      <tr className={'row'}>
                        <th className={'cell'} colSpan={11}>{group}</th>
                      </tr>
                      <tr className={'row'}>
                        <th className={'cell'}>Manager</th>
                        <th colSpan={2} className={'cell'}>player1</th>
                        <th colSpan={2} className={'cell'}>player2</th>
                        <th colSpan={2} className={'cell'}>player3</th>
                        <th colSpan={2} className={'cell'}>player4</th>
                        <th className={'cell'}>Points</th>
                        <th className={'cell'}>Rank</th>
                      </tr>
                      {
                        cupGroups[group]
                          .filter((team) => team.round === round)
                          .map((team) => (
                            <tr key={`${group}-${round}-${team.manager}`} className={'row'}>
                              <td className={'cell'}>{team.manager}</td>
                              <Player team={teams[team.manager]} cupTeam={team} player={1} />
                              <Player team={teams[team.manager]} cupTeam={team} player={2} />
                              <Player team={teams[team.manager]} cupTeam={team} player={3} />
                              <Player team={teams[team.manager]} cupTeam={team} player={4} />
                              <td className={'cell'}>{team.points}</td>
                              <td className={'cell'}>{team.rank}</td>
                            </tr>
                          ))
                      }
                    </tbody>
                  ))
                }
              </Fragment>
            ))
          }
        </table>
      </section>
    );
  }
}

Cup.propTypes = {
  cupLoaded: PropTypes.bool,
  teams: PropTypes.object,
  cupGroups: PropTypes.object,
  label: PropTypes.string,
  fetchCup: PropTypes.func.isRequired,
  managers: PropTypes.arrayOf(PropTypes.string),
  groups: PropTypes.arrayOf(PropTypes.string),
  rounds: PropTypes.arrayOf(PropTypes.string),
};

Cup.defaultProps = {
  label: 'Cup',
  cupLoaded: false,
  managers: [],
  groups: [],
  rounds: [],
};

Cup.contextTypes = {
  appConfig: PropTypes.object,
};

export default Cup;
