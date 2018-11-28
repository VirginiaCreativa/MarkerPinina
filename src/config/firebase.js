const firebase = require('firebase/app');
require('firebase/database');

const config = {
  apiKey: 'AIzaSyDXDmsRZqK6uZstYh1_-9AGGkOg6XJMizA',
  authDomain: 'markerpinina.firebaseapp.com',
  databaseURL: 'https://markerpinina.firebaseio.com',
  projectId: 'markerpinina',
  storageBucket: 'markerpinina.appspot.com',
  messagingSenderId: '166963697458',
};
firebase.initializeApp(config);

const database = firebase.database();
export { database };
