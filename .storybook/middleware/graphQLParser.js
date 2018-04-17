const bodyParser = require('body-parser');

module.exports = function graphQLParser(req, res, next) {
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
