const {
  fetchFixtures, fetchPlayer, fetchPlayersFull, fetchPlayersSummary
} = require('../../packages/data-sources/fetch-sky-sports/src/index');

module.exports = (router) => {
  router.get('/skysports/fixtures', (req, res) => {
    return fetchFixtures().then(res.json)
  });

  router.get('/skysports/players', (req, res) => {
    return fetchPlayersSummary().then(res.json)
  });

  router.get('/skysports/players-full', (req, res) => {
    return fetchPlayersFull().then((response) => res.json(response))
  });

  router.get('/skysports/player/:code', (req, res) => {
    const { code } = req.params;
    return fetchPlayer(code).then(res.json)
  });

};
