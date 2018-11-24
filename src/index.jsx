import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
// import { DB_CONFIG } from './config/firebase';
import App from './App';
import './config/config';

// firebase.initializeApp(DB_CONFIG);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);
