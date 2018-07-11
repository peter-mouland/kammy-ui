import { renderToString } from 'react-dom/server';
import matchPath from 'react-router-dom/matchPath';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

// import { actions } from '@redux/config';
import configureStore from '@kammy-ui/redux-store';

import reactAssets from '../utils/react-assets';
import Html from '../utils/html-template';
import Root from '../../app/Root';
// import config from '../../config/config';
import routesConfig from '../../app/routes.config';

// todo: better way to setup app reducers
const reducers = combineReducers({ routing });

function getMatch(routesArray, url) {
  return routesArray
    .find((route) => matchPath(url, { path: route.path, exact: true, strict: false }));
}

export default function reactMiddleWare() {
  return (ctx, next) => {
    const { js, css } = reactAssets();
    const context = {};
    const store = configureStore({}, reducers);
    // store.dispatch(actions.setConfig(config));
    const body = renderToString(Root({ location: ctx.request.url, context, store }));
    const initialState = JSON.stringify(store.getState(), null, 2);
    const appMarkup = Html({
      body, initialState, js, css,
    });

    const match = getMatch(routesConfig, ctx.request.url);
    ctx.status = match ? 200 : 404;
    ctx.body = `<!doctype html>${renderToString(appMarkup)}`;

    next();
  };
}
