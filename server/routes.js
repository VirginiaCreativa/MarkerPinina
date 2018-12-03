const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();
const serviceAccount = require('./firebase/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://markerpinina.firebaseio.com',
});
const db = admin.firestore();
const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);

router.get('/', async (req, res, next) => {
  try {
    const noteSnapshot = await db.collection('significados').get();
    noteSnapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (e) {
    next(e);
  }
});
router.get('/significados', async (req, res, next) => {
  try {
    const noteSnapshot = await db.collection('significados').get();
    const notes = [];
    noteSnapshot.forEach(doc => {
      notes.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.json(notes);
  } catch (e) {
    next(e);
  }
});

// router.get('/notascornell', async (req, res, next) => {
//   try {
//     const noteSnapshot = await db.collection('notascornell').get();
//     const notes = [];
//     noteSnapshot.forEach(doc => {
//       notes.push({
//         id: doc.id,
//         data: doc.data(),
//       });
//     });
//     res.json(notes);
//   } catch (e) {
//     next(e);
//   }
// });

// router.get('/documentos', async (req, res, next) => {
//   try {
//     const noteSnapshot = await db.collection('documentos').get();
//     const notes = [];
//     noteSnapshot.forEach(doc => {
//       notes.push({
//         id: doc.id,
//         data: doc.data(),
//       });
//     });
//     res.json(notes);
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
