/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import {
  Home,
  Significados,
  NotasCornell,
  Traduccion,
  Foros,
  NotFound,
} from './lazy';

class Router extends Component {
  state = {};

  render() {
    return (
      <div>
        <Switch>
          <Route path="/foros" component={Foros} />
          <Route path="/significados" component={Significados} />
          <Route path="/traduccion" component={Traduccion} />
          <Route path="/notascornell" component={NotasCornell} />
          <Route path="/" exact component={Home} />
          <Route path="/*" component={NotFound} />
          <Redirect from="/*" to="/notfound" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Router);
