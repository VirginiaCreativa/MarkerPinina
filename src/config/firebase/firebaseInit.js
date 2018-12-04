import { firebaseConfig } from './firebaseConfig';

const firebase = require('firebase/app');
require('firebase/database');

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export { database };
