import './server/polyfills';
import './config/config';
import createServer from './server/create-server';
import reducers from './config/reducers';

const assetsConfig = (process.env.NODE_ENV === 'production')
  ? require('../compiled/webpack-assets.json') // eslint-disable-line global-require
  : { polyfills: { js: '/polyfills.js' }, app: { js: '/app.js', css: '/app.css' } };

createServer({ assetsConfig, reducers }).listen(process.env.DEV_PORT || process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line no-console
});
