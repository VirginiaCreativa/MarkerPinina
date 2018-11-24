/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Significados from '../pages/Sigfinicados';
import SignificadosDetails from '../components/significados/significados_details/SignificadosDetails';
import NotasCornell from '../pages/Notascornell';
import Documentos from '../pages/Documentos';
import Foros from '../pages/Foros';
import NotFound from '../pages/NotFound';

class Router extends Component {
  state = {};

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/foros" component={Foros} />
          <Route path="/significados" component={Significados} />
          <Route
            path="/significadosdetail/:id"
            component={SignificadosDetails}
          />
          <Route path="/documentos" component={Documentos} />
          <Route path="/notascornell" component={NotasCornell} />
          <Route path="/*" component={NotFound} />
          <Redirect from="/*" to="/notfound" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Router);
