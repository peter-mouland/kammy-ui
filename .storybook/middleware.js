const realFetch = require('node-fetch'); // eslint-disable-line global-require

const authRouter = require('./routes/routes.auth');
const skySportsRouter = require('./routes/routes.skysports');
const graphQlRouter = require('./routes/routes.graphql');
const googleSpreadsheetRouter = require('./routes/routes.google-spreadsheet');

if (global && !global.fetch) {
  global.fetch = realFetch;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}

module.exports = function expressMiddleware (router) {
  skySportsRouter(router);
  googleSpreadsheetRouter(router);
  authRouter(router);
  graphQlRouter(router);
};
