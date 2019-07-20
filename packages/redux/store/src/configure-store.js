import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

const inBrowser = typeof window === 'object';
const middleware = [
  thunk,
  promiseMiddleware,
  createLogger({
    predicate: () => inBrowser && process.env.NODE_ENV !== 'production',
    collapsed: true,
  }),
];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (inBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore(initialState, reducers) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  return store;
}
