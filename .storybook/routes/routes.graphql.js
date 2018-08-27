const bodyParser = require('body-parser');

const { default: graphQL } = require('../../packages/server/graphql/dist/index.min');

function graphQLParser(req, res, next) {
  if (req.is('application/graphql')) {
    bodyParser.text({ type: 'application/graphql' })(req, res, () => {
      req.headers['content-type'] = 'application/json';
      next();
    });
  } else {
    bodyParser.json()(req, res, next);
  }
}

module.exports = (router) => {
  router.use(graphQLParser);

  router.post('/graphql', async (request, res) => {
      const { query, variables } =  JSON.parse(request.body);
      console.log('Fetching ' + query, variables);

      await graphQL({ query, variables })
        .then((result) => {
          if (result.errors){
            return res.status(500).json(result.errors);
          }
          return res.json(result);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
  });
};
