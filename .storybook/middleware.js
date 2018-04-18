const jwt = require('jsonwebtoken');

const fetchr = require('./fetchr');
const graphQLParser = require('./middleware/graphQLParser');
const getPlayersQueryJson = require('./fixtures/getPlayersQuery.fixture');
const getPlayerFixturesQueryJson = require('./fixtures/getPlayerFixturesQuery.fixture');
const getFixtures = (code) => fetchr.getJSON(`https://fantasyfootball.skysports.com/cache/json_player_stats_${code}.json`);

module.exports = function expressMiddleware (router) {
  router.use(graphQLParser);

  router.post('/graphQL', (req, res) => {
    const { query } = req.body;
    console.log('Fetching ' + query);

    switch (query) {
      case 'getPlayersQuery':
        return res.json(getPlayersQueryJson);
      case 'getPlayerFixturesQuery':
        return res.json(getPlayerFixturesQueryJson);
    }
  });

  router.get('/players', (req, res) => {
    return fetchr.getJSON('https://fantasyfootball.skysports.com/cache/json_players.json')
      .then((data) => res.json(data))
  });

  router.get('/player/:code', async (req, res) => {
    const { code } = req.params;
    return getFixtures(code)
      .then((fixtures) => ({ ...fixtures, code }))
      .then((data) => res.json(data))
  });

  router.use('/auth/login', (req, res) => {
    const payload = {
      sub: 'sub',
      email: 'email',
      isAdmin: true,
      mustChangePassword: false,
      loggedIn: true,
      name: 'name'
    };

    // create a token string
    const token = jwt.sign(payload, 'demo-secret');
    res.json({ token });
  });

  router.use('/auth/updatePassword', (req, res) => {
    const payload = {
      sub: 'sub',
      email: 'email',
      isAdmin: true,
      mustChangePassword: false,
      loggedIn: true,
      name: 'name'
    };

    // create a token string
    const token = jwt.sign(payload, 'demo-secret');
    res.json({ token });
  });
};
