import React from 'react';
import { renderToString } from 'react-dom/server';
import matchPath from 'react-router-dom/matchPath';

import configureStore from '@kammy-ui/redux-store';
import { appConfig } from '@kammy-ui/app-config-provider';

function getMatch(routesArray, url) {
  return routesArray
    .find((route) => matchPath(url, { path: route.path, exact: true, strict: false }));
}

export default function reactMiddleWare({
  Root, // component
  Html, // Html Component
  GA_KEY,
  reducers,
  extractor,
  preDispatch = () => {}, // func to execute custom store.dispatch methods
}) {
  return async (ctx, next) => {
    const context = {};
    const store = configureStore({}, reducers);
    const initialState = JSON.stringify(store.getState(), null, 2);
    preDispatch(store); // e.g. for import { actions } from '@redux/config'; store.dispatch(actions.setConfig(config));
    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    const styleTags = extractor.getStyleTags();
    const rootHtml = renderToString(<Root { ...{
      location: ctx.request.url, context, store,
    } } />);

    const appHtml = extractor.collectChunks(Html({
      body: rootHtml, initialState, js: scriptTags, css: styleTags, links: linkTags, GA_KEY,
    }));

    const match = getMatch(appConfig.routes, ctx.request.url);
    ctx.status = match ? 200 : 404;
    ctx.body = `<!doctype html>${renderToString(appHtml)}`;

    await next();
  };
}
