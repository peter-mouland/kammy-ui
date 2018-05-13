const graphQL = require('../../packages/data-sources/graphql/src/index');
const graphQLParser = require('../middleware/graphQLParser');

module.exports = (router) => {
  router.use(graphQLParser);

  router.post('/graphql', async (request, res) => {
      const requestString = request.body;
      const { query, variables } = requestString;
      console.log('Fetching ' + query);

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
