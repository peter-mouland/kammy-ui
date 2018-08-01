const positions = [
  { label: 'GK / SUB', teamPos: ['GK', 'SUB'] },
  { label: 'CB', teamPos: ['CB'] },
  { label: 'FB', teamPos: ['FB'] },
  { label: 'AM', teamPos: ['AM'] },
  { label: 'MID', teamPos: ['MID'] },
  { label: 'STR', teamPos: ['STR', 'FWD'] },
];

export const getPositionLabel = (teamPos) => (
  positions.find((position) => position.teamPos.includes(teamPos))
);

export default positions;
