import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import handleError from '@kammy-ui/koa-middleware-handler-error';
import * as fetchSpreadsheet from '@kammy-ui/fetch-kammy-sheets';

export default () => {
  const router = Router({ prefix: '/google-spreadsheet' });
  router.use(bodyParser());
  router.use(handleError());

  router.get('/', (ctx) => {
    ctx.type = 'json';
    ctx.status = 200;
    ctx.response.body = { status: 'healthy' };
  });

  router.get('/:type/:division', (ctx, next) => {
    const { type, division } = ctx.params;
    return (fetchSpreadsheet.default || fetchSpreadsheet)[type](division)
      .then((data) => {
        ctx.type = 'json';
        ctx.status = 200;
        ctx.response.body = { data };
        // if (type.toLowerCase() === 'players') {
        // todo: fix this
        // ctx.compress = false;
        // }
        next();
      });
  });

  return router;
};
