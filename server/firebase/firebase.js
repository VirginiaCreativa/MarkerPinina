const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://markerpinina.firebaseio.com',
});
const db = admin.firestore();
const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);
module.exports = db;
