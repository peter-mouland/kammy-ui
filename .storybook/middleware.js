const jwt = require('jsonwebtoken');

const graphQLParser = require('./middleware/graphQLParser');
const getPlayersQueryJson = require('./fixtures/getPlayersQuery.fixture');
const getPlayerFixturesQueryJson = require('./fixtures/getPlayerFixturesQuery.fixture');

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
