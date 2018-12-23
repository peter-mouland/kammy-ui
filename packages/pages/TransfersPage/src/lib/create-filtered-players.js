import sortBy from '@kammy-ui/sort-columns';

import { changeTypes } from './consts';

const createFilteredPlayers = ({
  players = [], team = [], playerIn, playerOut,
}) => {
  const teamPlayers = team.reduce((prev, curr) => ([...prev, curr.name]), []);
  const positionsOrder = ['GK', 'FB', 'CB', 'MID', 'AM', 'STR', 'SUB'];
  const sortedTeam = team.sort(sortBy(['pos', 'name'], { pos: positionsOrder }));
  const sortedPlayers = players.sort(sortBy(['pos', 'name'], { pos: positionsOrder }));
  return ({
    out: {
      [changeTypes.LOAN]: sortedTeam,
      [changeTypes.SWAP]: sortedTeam.filter(({ teamPos }) => teamPos !== 'SUB'),
      [changeTypes.TRADE]: sortedTeam,
      [changeTypes.TRANSFER]: sortedTeam,
      [changeTypes.WAIVER]: sortedTeam,
      undefined: [],
      null: [],
    },
    in: {
      [changeTypes.LOAN]: sortedPlayers.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.SWAP]: sortedTeam.filter(({ teamPos }) => teamPos === 'SUB'),
      [changeTypes.TRADE]: sortedPlayers.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.TRANSFER]: sortedPlayers.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.WAIVER]: sortedPlayers.filter(({ name }) => !teamPlayers.includes(name)),
      undefined: [],
      null: [],
    },
    gap: {
      [changeTypes.TRADE]: sortedPlayers.filter(({ pos, name }) => (
        playerOut && pos === playerOut.pos && !teamPlayers.includes(name)),
      ),
    },
    displaced: {
      [changeTypes.TRADE]: sortedTeam.filter(({ pos }) => playerIn && pos === playerIn.pos),
    },
  });
};

export default createFilteredPlayers;
