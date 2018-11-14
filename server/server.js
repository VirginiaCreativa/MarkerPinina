/* eslint-disable no-path-concat */
const express = require('express');

const app = express();
const router = express.Router();
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const hotmiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

const logger = require('./logger.js');
const home = require('./routes/home.js');
const dashboard = require('./routes/dashboard.js');
const palabras = require('./routes/palabras.js');
const proyectos = require('./routes/proyectos.js');
const notebook = require('./routes/notebook.js');

const compiler = webpack(webpackConfig);

app.use(logger);

app.use(express.static(__dirname + '/dist'));
app.use(express.json());

app.use(
  hotmiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }),
);

app.use(
  middleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.dev,
  }),
);

// ROUTER
app.use('/', home);
app.use('/palabras', palabras);
app.use('/dashboard', dashboard);
app.use('/notebook', notebook);
app.use('/proyectos', proyectos);

app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Listening 3000');
});
