const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const bodyParserGraphQL = () => (req, res, next) => {
  if (req.is('application/graphql')) {
    bodyParser.text({ type: 'application/graphql' })(req, res, () => {
      req.headers['content-type'] = 'application/json';
      req.body = {
        query: req.body
      };
      next();
    });
  } else {
    bodyParser.json()(req, res, next);
  }
};

module.exports = function expressMiddleware (router) {
  router.use(bodyParserGraphQL())

  router.post('/graphQL', (req, res) => {
    const { query } = req.body;
    switch (query) {
      case 'getPlayersQuery':
        return res.json(require('./fixtures/getPlayersQuery.fixture'));
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
