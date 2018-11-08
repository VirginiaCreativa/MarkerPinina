import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Palabras from './pages/Palabras';
import Significados from './pages/Significados';

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/significados" component={Significados} />
            <Route path="/palabras" component={Palabras} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Layout>
      </>
    );
  }
}

export default hot(module)(App);
