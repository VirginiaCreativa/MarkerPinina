import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import App from './App';
import rootReducers from './store/reducers/rootReducers';
import './config/config';
import * as registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducers, compose(applyMiddleware(reduxThunk)));
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
