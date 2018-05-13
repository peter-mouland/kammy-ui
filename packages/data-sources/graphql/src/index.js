const { graphql } = require('graphql');

const { connect } = require('@kammy-ui/database');

connect(process.env.MONGODB_URI || 'mongodb://localhost/kammy-ui');

const playerQueries = require('./models/players.client-queries');
const schema = require('./graphql.schema');
const root = require('./graphql.root');

const queries = {
  ...playerQueries,
};

module.exports = ({ query, variables }) => (
  graphql(schema, queries[query] || query, root, {}, variables)
);
