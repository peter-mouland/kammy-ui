const debug = require('debug');
const { graphql } = require('graphql');

const config = require('../server-config/config');
const { connect } = require('./api/db/index');

const log = debug('kammy: config:');
log({ config })
log({ env: process.env })
connect(config.MONGODB_URI);

const queries = require("./api/graphql.queries");
const schema = require("./api/graphql.schema");
const root = require("./api/graphql.root");
const graphQLParser = require('../middleware/graphQLParser');


module.exports = (router) => {
  router.use(graphQLParser);

  router.post('/graphql', async (request, res) => {
      const requestString = request.body;
      const { query, variables } = requestString;
      console.log('Fetching ' + query);

      await graphql(schema, queries[query], root, context, variables)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
  });
};
