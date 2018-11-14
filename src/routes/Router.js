/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { Dashboard, Palabras, Notebook, Proyectos, NotFound } from './lazy';

class Router extends Component {
  state = {};

  render() {
    return (
      <div>
        <Switch>
          <Route path="/notebook" component={Notebook} />
          <Route path="/proyectos" component={Proyectos} />
          <Route path="/palabras" component={Palabras} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/*" component={NotFound} />
          <Redirect from="/*" to="/notfound" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Router);
