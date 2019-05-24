import { renderToString } from 'react-dom/server';
import matchPath from 'react-router-dom/matchPath';

import configureStore from '@kammy-ui/redux-store';
import reactAssets from '@kammy-ui/map-webpack-assets';
import { appConfig } from '@kammy-ui/app-config-provider';

function getMatch(routesArray, url) {
  return routesArray
    .find((route) => matchPath(url, { path: route.path, exact: true, strict: false }));
}

export default function reactMiddleWare({
  Root, // component
  Html, // Html Component
  reducers,
  assetsConfig,
  extractor,
  preDispatch = () => {}, // func to execute custom store.dispatch methods
}) {
  return (ctx, next) => {
    const { js, css } = reactAssets({ assetsConfig });
    const context = {};
    const store = configureStore({}, reducers);
    preDispatch(store); // e.g. for import { actions } from '@redux/config'; store.dispatch(actions.setConfig(config));
    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    const styleTags = extractor.getStyleTags();
    console.log({ scriptTags, linkTags, styleTags });
    // const jsx = extractor.collectChunks(Root({
    //   location: ctx.request.url, context, store,
    // }));
    // const htmlLoadable = renderToString(jsx);
    const body = renderToString(Root({
      location: ctx.request.url, context, store,
    }));
    const initialState = JSON.stringify(store.getState(), null, 2);
    const appMarkup = Html({
      body, initialState, js, css,
    });
    const match = getMatch(appConfig.routes, ctx.request.url);
    ctx.status = match ? 200 : 404;
    ctx.body = `<!doctype html>${renderToString(appMarkup)}`;

    next();
  };
}
