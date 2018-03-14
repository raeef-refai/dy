import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import videos from './modules/videos';

export default combineReducers({
  videos,
  routing: routerReducer,
})
