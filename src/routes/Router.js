/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { Dashboard, Palabras, Notebook, Proyectos, NotFound } from './lazy';

class Router extends Component {
  state = {};

  render() {
    console.log(this.props);
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Redirect from="/*" to="/notfound" />
          <Route path="/notebook" component={Notebook} />
          <Route path="/proyectos" component={Proyectos} />
          <Route path="/palabras" component={Palabras} />
          <Route component={NotFound} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Router);
