const fetchr = require('../../packages/helpers/fetchr/src/index');
const getFixtures = (code) => fetchr.getJSON(`https://fantasyfootball.skysports.com/cache/json_player_stats_${code}.json`);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = (router) => {

  router.get('/skysports/fixtures', (req, res) => {
    return fetchr.getJSON('https://fantasyfootball.skysports.com/cache/json_fixtures.json')
      .then((data) => res.json({ data }))
  });

  router.get('/skysports/players', (req, res) => {
    return fetchr.getJSON('https://fantasyfootball.skysports.com/cache/json_players.json')
      .then((data) => res.json({ data }))
  });

  router.get('/skysports/players-full', (req, res) => {
    const start = new Date();
    return fetchr.getJSON('https://fantasyfootball.skysports.com/cache/json_players.json')
      .then(async (data) => {
        const promises = data.players.map(async (player, i) => {
          await delay((i * 25));
          const fixtures = await getFixtures(player.id);
          return ({ ...player, ...fixtures });
        });
        const allWithFixtures = await Promise.all(promises);
        const ms = new Date() - start;

        console.log(`RESPONSE TIME: ${ms}ms`);

        return allWithFixtures;
      })
      .then((data) => res.json({ data }));
  });

  router.get('/skysports/player/:code', async (req, res) => {
    const { code } = req.params;
    return getFixtures(code)
      .then((fixtures) => ({ ...fixtures, code }))
      .then((data) => res.json({ data }))
  });

};
