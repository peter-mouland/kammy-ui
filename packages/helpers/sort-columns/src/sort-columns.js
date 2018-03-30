function getNestedKey(obj, key) {
  const isNestedKey = key.indexOf('.') > -1;
  if (!isNestedKey) return obj[key];
  return key.split('.').reduce((prev, curr) => prev[curr], obj);
}

export default function fieldSorter(fields, players) {
  return (prevPlayer, currPlayer) => fields
    .map((field) => {
      const desc = field[0] === '-';
      const dir = desc ? -1 : 1;
      const curr = desc ? field.substring(1) : field;
      const attrA = (curr === 'pos') ? players[prevPlayer.pos].order : getNestedKey(prevPlayer, curr);
      const attrB = (curr === 'pos') ? players[currPlayer.pos].order : getNestedKey(currPlayer, curr);
      if (attrA > attrB) return dir;
      if (attrA === null) return dir;
      if (attrB === null) return -(dir);
      return (attrA < attrB) ? -(dir) : 0;
    })
    .reduce((prev, curr) => prev || curr, 0);
}
