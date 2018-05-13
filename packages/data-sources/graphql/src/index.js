const { graphql } = require('graphql');

const { connect } = require('@kammy-ui/database');

connect(process.env.MONGODB_URI || 'mongodb://localhost/kammy-ui');

const playerQueries = require('./players/players.queries');
const schema = require('./graphql.schema');
const root = require('./graphql.root'); // todo

const queries = {
  ...playerQueries,
};

module.exports = ({ query, variables }) => graphql(schema, queries[query], root, {}, variables);
