require('./server/polyfills');
require('./config/config');

const createServer = require('./server/create-server').default; //eslint-disable-line

createServer().listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});
