import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import handleError from '@kammy-ui/koa-middleware-handler-error';
import fetchGoogleSpreadsheet from '@kammy-ui/fetch-google-sheets';

export default () => {
  const router = Router({ prefix: '/google-spreadsheet' });
  router.use(bodyParser());
  router.use(handleError());
  router.get('/:spreadsheetId/:worksheetName', (ctx, next) => {
    const { spreadsheetId, worksheetName } = ctx.params;
    return fetchGoogleSpreadsheet({ spreadsheetId, worksheetName })
      .then((data) => {
        ctx.type = 'json';
        ctx.status = 200;
        ctx.response.body = data;
        next();
      });
  });

  return router;
};
