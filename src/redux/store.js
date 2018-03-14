import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import clientMiddleware from './clientMiddleware';
import thunk from 'redux-thunk';
import axios from 'axios';

const middlewares = [clientMiddleware(axios), thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
