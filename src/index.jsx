/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import App from './App';
import Reducers from './store/reducers/reducers';
import './config/config';
import * as registerServiceWorker from './registerServiceWorker';

const store = createStore(Reducers, {}, applyMiddleware(reduxThunk));
console.log(store.getState());

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
registerServiceWorker.unregister();
