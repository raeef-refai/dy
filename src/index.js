import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import store, { history } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>
), document.getElementById('root'));
