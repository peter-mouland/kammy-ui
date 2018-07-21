const debug = require('debug');

const log = debug('base:server-logger');

module.exports = function logger() {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    log(`${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`);
  };
};
