import playerStats from './PlayerStats';

const PlayerStats = ({
  children,
  gameWeeks,
  data,
}) => {
  const player = playerStats({ data, gameWeeks });
  return children(player);
};

export default PlayerStats;
