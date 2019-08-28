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
  team, pendingTransfers, manager, handleChange, handleSubmit, picked, saving,
}) => (
  <section>
    {([1, 2, 3, 4]).map((index) => {
      const id = `manager-${manager}-player-${index}`;
      return (
        <div key={id}>
          <label htmlFor={id}>
            <span>Player {index}: </span>
            <PlayerPicker
              playerNumber={index - 1}
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
      { saving && (
        <Interstitial message={'Saving'} />
      )}
      {!saving && (
        <button onClick={handleSubmit}>Save Cup Team</button>
      )}
    </div>
  </section>
);

PickCupTeam.propTypes = {
  saving: PropTypes.bool,
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
  saving: false,
};

const Cup = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [manager, setManager] = useState('');
  const [round, setRound] = useState('');
  const [picked, setPicked] = useState([]);
  const { data: cupTeams } = useSelector(cupSelectors.getTeams);
  const { managers, rounds } = useSelector(cupSelectors.getCupMetaData);
  const { saved, saving } = useSelector(cupSelectors.getSaveStatus);
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

  // const saveCupTeam = (cupTeamInput) => dispatch(cupActions.saveCupTeam(cupTeamInput));
  const saveCupTeam = () => {
    const [player1, player2, player3, player4] = picked;
    const team = cupTeams.find(({ manager: cupManager }) => manager === cupManager) || {};
    const cupTeamInput = {
      player1, player2, player3, player4, manager, round, group: team.group,
    };
    dispatch(cupActions.saveCupTeam(cupTeamInput));
  };
  const hasFetchCup = cupLoaded || cupLoading;
  const hasFetchPremierLeague = premierLeagueLoaded || premierLeagueLoading;
  const hasFetchChampionship = championshipLoaded || championshipLoading;
  const hasFetchLeagueOne = leagueOneLoaded || leagueOneLoading;


  const closeModal = () => {
    batch(() => {
      setManager('');
      setPicked([]);
      setRound('');
      setProgress(0);
    });
  };

  const finishStep1 = (selection) => {
    batch(() => {
      setManager(selection);
      setPicked([]);
      setRound('');
      setProgress(2);
    });
  };
  const finishStep2 = (selection) => {
    batch(() => {
      setRound(selection);
      setPicked([]);
      setProgress(3);
    });
  };

  const pickPlayer = (player, index) => {
    const newPicked = [...picked];
    newPicked[index] = player;
    setPicked(newPicked);
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

  if (saved && progress === 3) {
    dispatch(cupActions.resetCupSave());
    closeModal();
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
        {progress === 0 && (
          <p>
            <button onClick={() => setProgress(1)}>Pick a Cup Team</button>
          </p>
        )}
        <Modal
          key={'whoAreYou'}
          id={'whoAreYou'}
          title={'Who Are You?'}
          open={progress === 1}
          onClose={closeModal}
        >
          <MultiToggle
            id={'manager'}
            options={managers.sort()}
            checked={manager}
            onChange={finishStep1}
          />
        </Modal>
        <Modal
          key={'whatRound'}
          id={'whatRound'}
          title={'Who Round Are You Picking For?'}
          open={progress === 2}
          onClose={closeModal}
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
          onClose={closeModal}
        >
          <PickCupTeam
            team={allManagerTeams[manager]}
            transfers={allManagerTransfers[manager]}
            pendingTransfers={allManagerPendingTransfers[manager]}
            manager={manager}
            picked={picked}
            handleChange={pickPlayer}
            handleSubmit={saveCupTeam}
            saving={saving}
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
