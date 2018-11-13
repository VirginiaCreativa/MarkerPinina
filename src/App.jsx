import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Router from './routes/Router';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  state = {};

  render() {
    return (
      <Layout>
        <Router />
      </Layout>
    );
  }
}

export default hot(module)(App);
