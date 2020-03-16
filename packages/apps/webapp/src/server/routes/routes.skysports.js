import Router from 'koa-router';
import handleError from '@kammy-ui/koa-middleware-handler-error';
import {
  fetchFixtures, fetchPlayer, fetchPlayersFull, fetchPlayersSummary, fetchLiveScores,
} from '@kammy-ui/fetch-sky-sports';
import { getJSON } from '@kammy-ui/fetchr';

const responder = (ctx, next) => (data) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = data;
  next();
};

export default () => {
  const router = Router({ prefix: '/skysports' });
  router.use(handleError());

  router.get('/', (ctx) => {
    ctx.type = 'json';
    ctx.status = 200;
    ctx.response.body = { status: 'healthy' };
  });

  router.get('/proxy/:url', (ctx, next) => {
    const { url } = ctx.request.params;
    return getJSON(`https://fantasyfootball.skysports.com/${url}`).then(responder(ctx, next));
  });

  router.get('/fixtures', (ctx, next) => fetchFixtures().then(responder(ctx, next)));
  router.get('/live-scores', (ctx, next) => fetchLiveScores().then(responder(ctx, next)));

  router.get('/players', (ctx, next) => {
    // todo: fix this
    ctx.compress = false;
    return fetchPlayersSummary().then(responder(ctx, next));
  });

  router.get('/players-full', (ctx, next) => fetchPlayersFull().then(responder(ctx, next)));

  router.get('/player/:code', (ctx, next) => {
    const { code } = ctx.request.params;
    return fetchPlayer(code).then(responder(ctx, next));
  });

  return router;
};
