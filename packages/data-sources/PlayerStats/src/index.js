import playerStats from './PlayerStats';

const PlayerStats = ({
  children,
  start,
  end,
  data,
}) => {
  const player = playerStats({ data, start, end });
  return children(player);
};

export default PlayerStats;
