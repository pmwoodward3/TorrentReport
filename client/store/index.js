import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import stats from './stats';
import listings from './listings';
import infos from './infos';
import test from './test';

const reducer = combineReducers({
  user,
  test,
  stats,
  listings,
  infos,
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './stats';
export * from './listings';
export * from './infos';
export * from './test';
