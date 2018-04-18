import summarizePlayerStats from './SummarizePlayerStats';

const SummarizePlayerStats = ({
  children,
  start,
  end,
  data,
}) => (
  children({ stats: summarizePlayerStats({ data, start, end }) })
);

export default SummarizePlayerStats;
