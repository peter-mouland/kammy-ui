module.exports = (router) => {
  router.get('/skysports-fixtures/json_fixtures', () => {
    return require('../fixtures/skysports/json_fixtures.json')
  });

  router.get('/skysports-fixtures/json_players', () => {
    return require('../fixtures/skysports/json_players.json')
  });

  router.get('/skysports-fixtures/player-stats/:code', (req) => {
    const { code } = req.params;
    return require(`../fixtures/skysports/player-stats-${code}.json`)
  });
};
