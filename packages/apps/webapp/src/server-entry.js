require('babel-polyfill');
require('./config/config');
require('./server/polyfills');

const routesConfig = require('./config/routes.config').default;
const assetsConfig = require('../compiled/webpack-assets.json'); // eslint-disable-line global-require

const createServer = require('./server/create-server').default; //eslint-disable-line
createServer({ routesConfig, assetsConfig }).listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});
