import Koa from 'koa';
import compress from 'koa-compress';
import session from 'koa-session';
import convert from 'koa-convert';
import passport from 'koa-passport';
import qs from 'koa-qs';
import Router from 'koa-router';
import koaStatic from 'koa-static';

import Html from '@kammy-ui/html';
import handleError from '@kammy-ui/koa-middleware-handler-error';
import headers from '@kammy-ui/koa-middleware-headers';
import responseTime from '@kammy-ui/koa-middleware-response-time';
// import logger from '@kammy-ui/koa-middleware-logger';
import react from '@kammy-ui/koa-middleware-react';

import Root from '../AppRoot/AppRoot';
import graphQlRouter from './routes/routes.graphql';
import skySportsRouter from './routes/routes.skysports';
import googleSpreadsheetRouter from './routes/routes.google-spreadsheet';
import { DIST } from '../config/paths';
import prefetch from './prefetch';

const GA_KEY = process.env.NODE_ENV === 'production' ? 'UA-144222833-1' : null;
const YEAR = 100 * 60 * 60 * 24 * 7 * 52;
const server = new Koa();
const router = new Router();
const staticRoute = koaStatic(DIST, { immutable: true, maxage: YEAR });
const graphQlRoutes = graphQlRouter();
const skySportsRoutes = skySportsRouter();
const googleSpreadsheetRoutes = googleSpreadsheetRouter();

qs(server);

staticRoute._name = 'koaStatic /dist'; // eslint-disable-line no-underscore-dangle
server.keys = ['Shh, its a session!'];
server.use(convert(session({
  key: 'session', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}, server)));

server.use(passport.initialize());
server.use(passport.session());
server.use(handleError('render500'));
server.use(responseTime());
server.use(compress());
// server.use(logger());
server.use(headers());

export default ({
  reducers, assetsConfig, extractor,
}) => {
  router
    .use(graphQlRoutes.routes())
    .use(graphQlRoutes.allowedMethods())
    .use(skySportsRoutes.routes())
    .use(skySportsRoutes.allowedMethods())
    .use(googleSpreadsheetRoutes.routes())
    .use(googleSpreadsheetRoutes.allowedMethods())
    .use(staticRoute)
    .get('/(.*)', react({
      assetsConfig, prefetch, reducers, Root, Html, extractor, GA_KEY,
    }));
  server.use(router.routes());
  return server;
};
