import { changeTypes } from './consts';

const createFilteredPlayers = ({
  players = [], team = [], playerIn, playerOut,
}) => {
  const teamPlayers = team.reduce((prev, curr) => ([...prev, curr.name]), []);
  return ({
    out: {
      [changeTypes.LOAN]: team,
      [changeTypes.SWAP]: team.filter(({ teamPos }) => teamPos !== 'SUB'),
      [changeTypes.TRADE]: team,
      [changeTypes.TRANSFER]: team,
      [changeTypes.WAIVER]: team,
      undefined: [],
      null: [],
    },
    in: {
      [changeTypes.LOAN]: players.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.SWAP]: team.filter(({ teamPos }) => teamPos === 'SUB'),
      [changeTypes.TRADE]: players.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.TRANSFER]: players.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.WAIVER]: players.filter(({ name }) => !teamPlayers.includes(name)),
      undefined: [],
      null: [],
    },
    gap: {
      [changeTypes.TRADE]: players.filter(({ pos, name }) => (
        playerOut && pos === playerOut.pos && !teamPlayers.includes(name)),
      ),
    },
    displaced: {
      [changeTypes.TRADE]: team.filter(({ pos }) => playerIn && pos === playerIn.pos),
    },
  });
};

export default createFilteredPlayers;
