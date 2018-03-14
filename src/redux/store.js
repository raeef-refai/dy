import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import clientMiddleware from './clientMiddleware';
import thunk from 'redux-thunk';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';

const middlewares = [clientMiddleware(axios), thunk];

let composeEnhancers;

if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose;
} else {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const history = syncHistoryWithStore(createHistory(), store);

export default store;
