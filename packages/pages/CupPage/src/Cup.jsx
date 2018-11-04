import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import Modal from '@kammy-ui/modal';
import PlayerPicker from './components/player-picker';

const bem = bemHelper({ block: 'division-stats' });

const PickCupTeam = ({
  team, manager, handleChange, handleSubmit,
}) => (
  <section>
    {([1, 2, 3, 4]).map((index) => {
      const id = `manager-${manager}-player-${index}`;
      return (
        <div key={id}>
          <label htmlFor={id}>
            <span>Player {index}: </span>
            <PlayerPicker
              id={id}
              team={team} handleChange={(e) => handleChange(e, index)} />
          </label>
        </div>
      );
    })}
    <div>
      <button onClick={handleSubmit}>Save Cup Team</button>
    </div>
  </section>
);

PickCupTeam.propTypes = {
  team: PropTypes.arrayOf(PropTypes.shape({
    picked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  manager: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const requiresPicker = (cupTeam) => [1, 2, 3, 4].filter((index) => cupTeam[`player${index}`].name).length === 0;

const insultGenerator = (manager) => `${manager}, pick a god damn team!`;

const CupPlayers = ({ cupTeam, handleClick }) => (
  requiresPicker(cupTeam)
    ? <td colSpan={8} style={{ textAlign: 'center' }}><button onClick={handleClick}>{insultGenerator(cupTeam.manager)}</button></td>
    : [1, 2, 3, 4].map((index) => {
      const { name, points } = cupTeam[`player${index}`];
      return (
        <React.Fragment key={index}>
          <td className={'cell'}>{name}</td>
          <td className={'cell'}>{points}</td>
        </React.Fragment>
      );
    })
);

const PlayerProps = {
  code: PropTypes.number,
  name: PropTypes.string,
  points: PropTypes.number,
  rank: PropTypes.number,
};

CupPlayers.propTypes = {
  handleClick: PropTypes.func.isRequired,
  cupTeam: PropTypes.shape({
    player1: PropTypes.shape(PlayerProps),
    player2: PropTypes.shape(PlayerProps),
    player3: PropTypes.shape(PlayerProps),
    player4: PropTypes.shape(PlayerProps),
  }).isRequired,
};

class Cup extends React.Component {
  state = {
    showModal: false, pickCup: {}, pickedCup: {},
  };

  componentDidMount() {
    const { cupLoaded, fetchCup } = this.props;
    if (!cupLoaded) fetchCup();
  }

  pickCupTeam = ({
    team, manager, group, round,
  }) => {
    this.setState({
      showModal: true,
      pickCup: {
        team, manager, group, round,
      },
    });
  };

  pickPlayer = (e, playerNumber) => {
    const player = e.target.value;
    this.setState((currState) => ({
      pickedCup: {
        ...currState.pickedCup,
        manager: currState.pickCup.manager,
        group: currState.pickCup.group,
        round: currState.pickCup.round,
        [`player${playerNumber}`]: player,
      },
    }));
  };

  saveCupTeam = () => {
    const { pickedCup } = this.state;
    this.props.saveCupTeam(pickedCup)
      .then(() => {
        this.setState({
          showModal: false, pickCup: {}, pickedCup: {},
        });
      }).catch((e) => {
        console.error(e);
        this.setState({
          showModal: false, pickCup: {}, pickedCup: {},
        });
      });
  };

  render() {
    const {
      cupLoaded, cupGroups, label = 'Cup', groups, rounds, teams,
    } = this.props;
    const { showModal, pickCup } = this.state;

    return (
      <section id="cup-page" className={bem()}>
        <h1>{label}</h1>
        {!cupLoaded && (
          <Fragment>
            <Interstitial /> Data Gathering...
          </Fragment>
        )}
        {showModal && (
          <Modal
            key={'teamPicker'}
            id={'teamPicker'}
            title={`${pickCup.manager} Pick your cup team`}
            open={showModal}
            onClose={this.closeModal}
          >
            <PickCupTeam
              { ...pickCup }
              handleChange={this.pickPlayer}
              handleSubmit={this.saveCupTeam}
            />
          </Modal>
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
                              <CupPlayers
                                cupTeam={team}
                                handleClick={() => this.pickCupTeam({
                                  team: teams[team.manager], manager: team.manager, group, round,
                                })}
                              />
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
