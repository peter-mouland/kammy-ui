const {
  fetchFixtures, fetchPlayer, fetchPlayersFull, fetchPlayersSummary,
} = require('../../packages/server/fetch-sky-sports/dist/index.min').default;

module.exports = (router) => {
  router.get('/skysports/fixtures', (req, res) => {
    return fetchFixtures().then((data) => res.json(data))
  });

  router.get('/skysports/players', (req, res) => {
    return fetchPlayersSummary().then((data) => res.json(data))
  });

  router.get('/skysports/players-full', (req, res) => {
    return fetchPlayersFull().then((data) => res.json(data))
  });

  router.get('/skysports/player/:code', (req, res) => {
    const { code } = req.params;
    return fetchPlayer(code).then((data) => res.json(data))
  });

};
