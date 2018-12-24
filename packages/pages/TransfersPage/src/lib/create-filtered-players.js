import sortBy from '@kammy-ui/sort-columns';

import { changeTypes } from './consts';

const transferToTeam = (transfer) => ({
  manager: transfer.manager,
  club: transfer.clubIn,
  pos: transfer.posIn,
  name: transfer.transferIn,
  isTransfer: true,
  transferStatus: transfer.status,
});

const createFilteredPlayers = ({
  playersArray = [], team = [], playerIn, playerOut, pendingTransfers = [],
}) => {
  const teamPlayers = team.reduce((prev, curr) => ([...prev, curr.name]), []);
  const positionsOrder = ['GK', 'FB', 'CB', 'MID', 'AM', 'STR', 'SUB'];
  const sortedTeam = team.sort(sortBy(['pos', 'name'], { pos: positionsOrder }));
  const sortedPlayers = playersArray.sort(sortBy(['pos', 'name'], { pos: positionsOrder }));
  const teamAndRequests = sortedTeam.concat(pendingTransfers.map((transferToTeam)));
  return ({
    out: {
      [changeTypes.LOAN_START]: teamAndRequests,
      [changeTypes.LOAN_END]: teamAndRequests,
      [changeTypes.SWAP]: sortedTeam.filter(({ teamPos }) => teamPos !== 'SUB'),
      [changeTypes.TRADE]: teamAndRequests,
      [changeTypes.TRANSFER]: teamAndRequests,
      [changeTypes.NEW_PLAYER]: teamAndRequests,
      undefined: [],
      null: [],
    },
    in: {
      [changeTypes.LOAN_START]: sortedPlayers.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.LOAN_END]: sortedPlayers.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.SWAP]: sortedTeam.filter(({ teamPos }) => teamPos === 'SUB'),
      [changeTypes.TRADE]: sortedPlayers.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.TRANSFER]: sortedPlayers.filter(({ name }) => !teamPlayers.includes(name)),
      [changeTypes.NEW_PLAYER]: sortedPlayers.filter(({ name }) => !teamPlayers.includes(name)),
      undefined: [],
      null: [],
    },
    gap: {
      [changeTypes.TRADE]: sortedPlayers.filter(({ pos, name }) => (
        playerOut && pos === playerOut.pos && !teamPlayers.includes(name)),
      ),
      [changeTypes.LOAN_END]: sortedPlayers.filter(({ pos, name }) => (
        playerOut && pos === playerOut.pos && !teamPlayers.includes(name)),
      ),
      [changeTypes.LOAN_START]: sortedPlayers.filter(({ pos, name }) => (
        playerOut && pos === playerOut.pos && !teamPlayers.includes(name)),
      ),
    },
    displaced: {
      [changeTypes.TRADE]: teamAndRequests.filter(({ pos }) => playerIn && pos === playerIn.pos),
      [changeTypes.LOAN_START]: teamAndRequests.filter(({ pos }) => playerIn && pos === playerIn.pos),
      [changeTypes.LOAN_END]: teamAndRequests.filter(({ pos }) => playerIn && pos === playerIn.pos),
    },
  });
};

export default createFilteredPlayers;
