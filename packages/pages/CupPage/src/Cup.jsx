import React, { useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import PropTypes from 'prop-types';
import MultiToggle from '@kammy-ui/multi-toggle';
import { actions as cupActions, selectors as cupSelectors } from '@kammy-ui/redux.cup';
import { selectors as divisionSelectors, actions as divisionActions } from '@kammy-ui/redux.division';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import Modal from '@kammy-ui/modal';
import PlayerPicker from './components/player-picker';

const bem = bemHelper({ block: 'division-stats' });

const PickCupTeam = ({
  team, pendingTransfers, manager, handleChange, handleSubmit, picked,
}) => (
  <section>
    {([1, 2, 3, 4]).map((index) => {
      const id = `manager-${manager}-player-${index}`;
      return (
        <div key={id}>
          <label htmlFor={id}>
            <span>Player {index}: </span>
            <PlayerPicker
              pendingTransfers={pendingTransfers}
              picked={picked}
              id={id}
              team={team}
              handleChange={handleChange}
            />
          </label>
        </div>
      );
    })}
    <div>
      <p>
        <strong>Important</strong>: The order in which you pick your players matters!
      </p>
      <p>
        In the event of tied scores, Player 1&apos;s score will be used as a tie break.
        If that fails to separate teams, Player 2&apos;s score will be
        used... and so on until there is a clear winner.
      </p>
      <button onClick={handleSubmit}>Save Cup Team</button>
    </div>
  </section>
);

PickCupTeam.propTypes = {
  picked: PropTypes.array,
  pendingTransfers: PropTypes.array,
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  manager: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

PickCupTeam.defaulProps = {
  picked: [],
};

//
// class Cup extends React.Component {
//   state = {
//     showModal: false, pickCup: {}, pickedCup: {}, selectedRound: ALL, selectedGroup: ALL,
//   };
//
//   pickCupTeam = ({
//     team, manager, group, round,
//   }) => {
//     this.setState({
//       showModal: true,
//       pickCup: {
//         team, manager, group, round,
//       },
//     });
//   };
//
//   pickPlayer = (e, playerNumber) => {
//     const player = e.target.value;
//     this.setState((currState) => ({
//       pickedCup: {
//         ...currState.pickedCup,
//         manager: currState.pickCup.manager,
//         group: currState.pickCup.group,
//         round: currState.pickCup.round,
//         [`player${playerNumber}`]: player,
//       },
//     }));
//   };
//
//   saveCupTeam = () => {
//     const { pickedCup } = this.state;
//     this.props.saveCupTeam(pickedCup)
//       .then(() => {
//         this.setState({
//           showModal: false, pickCup: {}, pickedCup: {},
//         });
//       }).catch((e) => {
//         console.error(e);
//         this.setState({
//           showModal: false, pickCup: {}, pickedCup: {},
//         });
//       });
//   };
//
//   render() {
//     const {
//       cupLoaded, cupGroups, label = 'Cup', groups, rounds, teams,
//     } = this.props;
//     const {
//       showModal, pickCup, selectedRound, selectedGroup,
//     } = this.state;
//     const [progress, setProgress] = useSet(0);
//
//     return (
//       <section id="cup-page" className={bem()} data-b-layout="container">
//         <div data-b-layout="row vpad">
//           <h1 data-b-layout="full">{label}</h1>
//           {!cupLoaded && (
//             <div data-b-layout="full">
//               <Interstitial/> Data Gathering...
//             </div>
//           )}
//           <p>
//             <button onClick={() => setProgress(1)}>Pick a Cup Team</button>
//           </p>
//           <Modal
//             key={'whoAreYou'}
//             id={'whoAreYou'}
//             title={`Who Are You`}
//             open={progress === 1}
//             onClose={this.closeModal}
//           >
//             <h4>1. Who are you?</h4>
//             <MultiToggle
//               id={'manager'}
//               loadingMessage={'loading teams...'}
//               options={managers}
//               checked={manager}
//               onChange={this.updateDisplayManager}
//             />
//           </Modal>
//           {showModal && (
//             <div data-b-layout="full">
//               <Modal
//                 key={'teamPicker'}
//                 id={'teamPicker'}
//                 title={`${pickCup.manager} Pick your cup team`}
//                 open={showModal}
//                 onClose={this.closeModal}
//               >
//                 <PickCupTeam
//                   {...pickCup}
//                   handleChange={this.pickPlayer}
//                   handleSubmit={this.saveCupTeam}
//                 />
//               </Modal>
//             </div>
//           )}
//         </div>
//         {/*<div data-b-layout="row vpad">*/}
//         {/*    <CupPlayers*/}
//         {/*      cupTeam={team}*/}
//         {/*      handleClick={() => this.pickCupTeam({*/}
//         {/*        team: teams[team.manager], manager: team.manager, group, round,*/}
//         {/*      })}*/}
//         {/*    />*/}
//         {/*</div>*/}
//       </section>
//     );
//   }
// }

const Cup = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [manager, setManager] = useState('');
  const [round, setRound] = useState('');
  const [picked, setPicked] = useState([]);
  // const { data: cupGroups } = useSelector(cupSelectors.cupGroups);
  const { managers, rounds } = useSelector(cupSelectors.getCupMetaData);
  const { loaded: cupLoaded, loading: cupLoading } = useSelector(cupSelectors.getStatus);
  const { loaded: premierLeagueLoaded, loading: premierLeagueLoading } = useSelector(divisionSelectors.getStatus('premierLeague'));
  const { loaded: championshipLoaded, loading: championshipLoading } = useSelector(divisionSelectors.getStatus('championship'));
  const { loaded: leagueOneLoaded, loading: leagueOneLoading } = useSelector(divisionSelectors.getStatus('leagueOne'));
  const premierLeague = useSelector(divisionSelectors.getCurrentTeams('premierLeague'));
  const championship = useSelector(divisionSelectors.getCurrentTeams('championship'));
  const leagueOne = useSelector(divisionSelectors.getCurrentTeams('leagueOne'));
  const premierLeaguePendingTransfers = useSelector(divisionSelectors.getPendingTransfers('premierLeague'));
  const championshipPendingTransfers = useSelector(divisionSelectors.getPendingTransfers('championship'));
  const leagueOnePendingTransfers = useSelector(divisionSelectors.getPendingTransfers('leagueOne'));
  const premierLeagueTransfers = useSelector(divisionSelectors.getTransfers('premierLeague'));
  const championshipTransfers = useSelector(divisionSelectors.getTransfers('championship'));
  const leagueOneTransfers = useSelector(divisionSelectors.getTransfers('leagueOne'));
  const allManagerTeams = {
    ...premierLeague.data,
    ...championship.data,
    ...leagueOne.data,
  };
  const allManagerPendingTransfers = {
    ...premierLeaguePendingTransfers.data,
    ...championshipPendingTransfers.data,
    ...leagueOnePendingTransfers.data,
  };
  const allManagerTransfers = {
    ...premierLeagueTransfers.data,
    ...championshipTransfers.data,
    ...leagueOneTransfers.data,
  };

  useSelector((state) => console.log(state) || state);
  // const teams = useSelector(cupSelectors.teams);
  // const saveCupTeam = (cupTeamInput) => dispatch(cupActions.saveCupTeam(cupTeamInput));
  const hasFetchCup = cupLoaded || cupLoading;
  const hasFetchPremierLeague = premierLeagueLoaded || premierLeagueLoading;
  const hasFetchChampionship = championshipLoaded || championshipLoading;
  const hasFetchLeagueOne = leagueOneLoaded || leagueOneLoading;


  const finishStep1 = (selection) => {
    batch(() => {
      setManager(selection);
      setRound('');
      setProgress(2);
    });
  };
  const finishStep2 = (selection) => {
    batch(() => {
      setRound(selection);
      setProgress(3);
    });
  };

  const pickPlayer = (player) => {
    setPicked([...picked, player]);
  };

  if (!hasFetchCup) {
    dispatch(cupActions.fetchCup());
  }

  if (!hasFetchPremierLeague && !hasFetchChampionship && !hasFetchLeagueOne) {
    batch(() => {
      dispatch(divisionActions.fetchDivision('leagueOne'));
      dispatch(divisionActions.fetchDivision('championship'));
      dispatch(divisionActions.fetchDivision('premierLeague'));
    });
  }

  return (
    <section id="cup-page" className={bem()} data-b-layout="container">
      <div data-b-layout="row vpad">
        <h1 data-b-layout="full">Cup</h1>
        {!cupLoaded && (
          <div data-b-layout="full">
            <Interstitial/>
          </div>
        )}
        <p>
          <button onClick={() => setProgress(1)}>Pick a Cup Team</button>
        </p>
        <Modal
          key={'whoAreYou'}
          id={'whoAreYou'}
          title={'Who Are You?'}
          open={progress === 1}
          onClose={() => setProgress(0)}
        >
          <MultiToggle
            id={'manager'}
            options={managers}
            checked={manager}
            onChange={finishStep1}
          />
        </Modal>
        <Modal
          key={'whatRound'}
          id={'whatRound'}
          title={'Who Round Are You Picking For?'}
          open={progress === 2}
          onClose={() => setProgress(0)}
        >
          <MultiToggle
            id={'manager'}
            options={rounds}
            checked={round}
            onChange={finishStep2}
          />
        </Modal>
        <Modal
          key={'pickTeam'}
          id={'pickTeam'}
          title={'Who do you want to pick?'}
          open={progress === 3}
          onClose={() => setProgress(0)}
        >
          <PickCupTeam
            team={allManagerTeams[manager]}
            transfers={allManagerTransfers[manager]}
            pendingTransfers={allManagerPendingTransfers[manager]}
            manager={manager}
            picked={picked}
            handleChange={pickPlayer}
            handleSubmit={console.log}
          />
        </Modal>
      </div>
    </section>
  );
};

Cup.contextTypes = {
  appConfig: PropTypes.object,
};

export default Cup;
