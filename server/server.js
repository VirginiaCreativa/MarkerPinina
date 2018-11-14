const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
// const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
// const hotmiddleware = require('webpack-hot-middleware');
// const webpackConfig = require('../webpack.config.js');

const logger = require('./logger.js');
const home = require('./routes/home.js');
const dashboard = require('./routes/dashboard.js');
const palabras = require('./routes/palabras.js');
const proyectos = require('./routes/proyectos.js');
const notebook = require('./routes/notebook.js');

app.use(logger);

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(bodyParser.json());

// const compiler = webpack(webpackConfig);

// app.use(
//   hotmiddleware(compiler, {
//     log: false,
//     reload: true,
//   }),
// );

// app.use(
//   middleware(compiler, {
//     noInfo: true,
//     publicPath: webpackConfig.dev,
//     watchOptions: true,
//   }),
// );

// ROUTER
app.use('/', home);
app.use('/dashboard', dashboard);
app.use('/palabras', palabras);
app.use('/proyectos', proyectos);
app.use('/notebook', notebook);

app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Listening 8080');
});
