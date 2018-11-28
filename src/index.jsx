/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import Reducers from './store/reducers';
import './config/config';
import * as registerServiceWorker from './registerServiceWorker';

const store = createStore(Reducers, applyMiddleware(reduxThunk));

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
registerServiceWorker.unregister();
