require('babel-polyfill');
require('./config/config');
require('./server/polyfills');

const routesConfig = require('./config/routes.config').default;
const reducers = require('./config/reducers').default;

const assetsConfig = (process.env.NODE_ENV === 'production')
  ? require('../compiled/webpack-assets.json') // eslint-disable-line global-require
  : { vendor: { js: '/vendor.js' }, polyfills: { js: '/polyfills.js' }, app: { js: '/app.js', css: '/app.css' } };

const createServer = require('./server/create-server').default; //eslint-disable-line

createServer({ routesConfig, assetsConfig, reducers }).listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});
