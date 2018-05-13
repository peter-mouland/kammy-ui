const { getJSON } = require('@kammy-ui/fetchr');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getFixtures = (code) => getJSON(`https://fantasyfootball.skysports.com/cache/json_player_stats_${code}.json`);

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

const mapToFFDataStructure = (prev, curr) => ({
  ...prev,
  [`${curr.sName}, ${curr.fName}`.trim()]: {
    code: parseInt(curr.id, 10),
    name: `${curr.sName}, ${curr.fName}`.trim(),
    skySportsPosition: curr.group.toUpperCase(),
    skySportsClub: toTitleCase(curr.tName),
    new: false,
    isHidden: false,
    fixtures: curr.fixtures,
    stats: curr.stats,
  },
});

const fetchFixtures = () => (
  getJSON('https://fantasyfootball.skysports.com/cache/json_fixtures.json')
    .then((data) => ({ data }))
    .catch(console.error)
);

const fetchPlayersSummary = () => (
  getJSON('https://fantasyfootball.skysports.com/cache/json_players.json')
    .then((data) => ({ data: data.players.reduce(mapToFFDataStructure, {}) }))
    .catch(console.error)
);

const fetchPlayersFull = () => {
  const start = new Date();
  return getJSON('https://fantasyfootball.skysports.com/cache/json_players.json')
    .then(async (data) => {
      const promises = data.players.map(async (player, i) => {
        await delay((i * 20));
        const fixtures = await getFixtures(player.id);
        return ({ ...player, ...fixtures });
      });
      const allWithFixtures = await Promise.all(promises);
      const ms = new Date() - start;

      console.log(`RESPONSE TIME: ${ms}ms`);

      return allWithFixtures;
    })
    .then((data) => ({ data: data.reduce(mapToFFDataStructure, {}) }))
    .catch(console.error);
};

const fetchPlayer = (code) => (
  getFixtures(code)
    .then((fixtures) => ({ ...fixtures, code }))
    .then((data) => ({ data: mapToFFDataStructure({}, data) }))
    .catch(console.error)
);

module.exports = {
  fetchFixtures,
  fetchPlayersSummary,
  fetchPlayersFull,
  fetchPlayer,
};
