const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const datas = await axios
    .get(`https://markerpinina.firebaseio.com/significados.json`)
    .then(response => response.data)
    .catch(error => console.log(error));
  res.json(datas);
});

module.exports = router;
