const express = require('express');

const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '../../src', 'index.html'));
  res.send('HOME');
});
module.exports = router;
