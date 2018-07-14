import Koa from 'koa';
import compress from 'koa-compress';
import session from 'koa-session';
import convert from 'koa-convert';
import passport from 'koa-passport';
import qs from 'koa-qs';
import Router from 'koa-router';
import koaStatic from 'koa-static';

import Html from '@kammy-ui/html';
import Root from '@kammy-ui/app-root';

import handleError from './middleware/handle-error';
import logger from './middleware/logger';
import responseTime from './middleware/response-time';
import headers from './middleware/headers';
import react from './middleware/react-middleware';
import { DIST } from '../config/paths';

const server = new Koa();
const router = new Router();
console.log(DIST);
const staticRoute = koaStatic(DIST);

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
server.use(compress({ threshold: 2048 }));
server.use(logger());
server.use(headers());

export default ({
  routesConfig, preDispatch, reducers, assetsConfig,
}) => {
  router
    .use(staticRoute)
    .get('/(.*)', react({
      routesConfig, assetsConfig, preDispatch, reducers, Root, Html,
    }));
  server.use(router.routes());
  return server;
};
