import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Palabras from './pages/Palabras';
import Notebook from './pages/Notebook';
import Proyectos from './pages/Proyectos';

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/notebook" component={Notebook} />
            <Route path="/proyectos" component={Proyectos} />
            <Route path="/palabras" component={Palabras} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Layout>
      </>
    );
  }
}

export default hot(module)(App);
