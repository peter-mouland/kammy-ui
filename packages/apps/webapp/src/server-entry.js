import './server/polyfills';
import './config/config';
import routesConfig from './config/routes.config';
import reducers from './config/reducers';
import createServer from './server/create-server';

const assetsConfig = (process.env.NODE_ENV === 'production')
  ? require('../compiled/webpack-assets.json') // eslint-disable-line global-require
  : { vendor: { js: '/vendor.js' }, polyfills: { js: '/polyfills.js' }, app: { js: '/app.js', css: '/app.css' } };

createServer({ routesConfig, assetsConfig, reducers }).listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line no-console
});
