import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line
import user from './user';
import stats from './stats';
import listings from './listings';
import infos from './infos';
import groups from './groups';
import sites from './sites';
import test from './test';

const reducer = combineReducers({
  user,
  test,
  stats,
  listings,
  infos,
  groups,
  sites,
});
// eslint-disable-next-line
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './stats';
export * from './listings';
export * from './infos';
export * from './groups';
export * from './sites';
export * from './test';
