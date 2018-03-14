import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Search from './containers/Search';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/search" component={Search} />
        <Redirect to="/search" />
      </Switch>
    );
  }
}

export default Routes;
