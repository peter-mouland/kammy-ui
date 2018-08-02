import positions from './positions';

const sortingFactory = (pos, dataKey) => (
  (itemA, itemB) => (
    itemA[pos] && itemB[pos] ? itemA[pos][dataKey] - itemB[pos][dataKey] : 0
  )
);

const getTeamRank = (arr, pos, dataKey) => {
  const sorter = sortingFactory(pos, dataKey);
  const sorted = arr.sort(sorter);
  const ranked = arr.map((item) => sorted.findIndex((i) => sorter(item, i) === 0));
  const adjustRankForTies = (item, i) => (
    ranked.findIndex((rItem, rI) => rItem === item && i !== rI) > -1
      ? { rank: item + 0.5, manager: arr[i].manager }
      : { rank: item, manager: arr[i].manager }
  );
  return ranked
    .map(adjustRankForTies)
    .reduce((prev, item) => ({
      ...prev,
      [item.manager]: item.rank,
    }), {});
};

const getRank = (teamsWithDivisionPoints, dataKey) => {
  const ranks = (
    positions
      .reduce((prev, pos) => {
        const posRanks = getTeamRank(
          teamsWithDivisionPoints.map(
            (team) => ({ ...team.points, manager: team.manager }),
          ),
          pos.label,
          dataKey,
        );
        return ({
          ...prev,
          [pos.label]: posRanks,
        });
      }, {})
  );
  const total = {};
  Object.keys(ranks).forEach((position) => {
    Object.keys(ranks[position]).forEach((manager) => {
      total[manager] = (total[manager] || 0) + ranks[position][manager];
    });
  });
  return {
    ...ranks,
    total,
  };
};

const getDivisionRank = (teamsWithDivisionPoints) => ({
  gameWeek: getRank(teamsWithDivisionPoints, 'gameWeek'),
  season: getRank(teamsWithDivisionPoints, 'season'),
});

export default getDivisionRank;
